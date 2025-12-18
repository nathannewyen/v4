import useSWR from "swr";
import { StackOverflowAnswer, StackOverflowUser } from "@/types";
import { standardSwrConfig } from "@/lib/swrConfig";

// Stack Exchange API response types for answers
// Note: link field is not returned by default API, so we construct it manually
interface StackExchangeAnswerItem {
  answer_id: number;
  question_id: number;
  is_accepted: boolean;
  score: number;
  creation_date: number;
}

// Stack Exchange API response types for questions
interface StackExchangeQuestionItem {
  question_id: number;
  title: string;
  tags: string[];
}

// Stack Exchange API response types for user profile
interface StackExchangeUserItem {
  reputation: number;
  badge_counts: {
    gold: number;
    silver: number;
    bronze: number;
  };
  profile_image: string;
  display_name: string;
}

interface StackExchangeResponse<T> {
  items: T[];
  has_more: boolean;
  quota_remaining: number;
}

// Combined answer with question details
interface AnswerWithQuestion {
  answerId: number;
  questionId: number;
  questionTitle: string;
  isAccepted: boolean;
  score: number;
  link: string;
  creationDate: number;
  tags: string[];
}

// Stack Overflow user ID - configurable via environment variable for easy forking
const STACKOVERFLOW_USER_ID = process.env.NEXT_PUBLIC_STACKOVERFLOW_USER_ID ?? "14785807";

// Return type for useStackOverflow hook
interface UseStackOverflowResult {
  answers: StackOverflowAnswer[];
  user: StackOverflowUser | null;
  isLoading: boolean;
  isError: boolean;
}

// Fetcher that gets answers and then fetches question details
const fetchAnswersWithQuestions = async (): Promise<AnswerWithQuestion[]> => {
  // Step 1: Fetch user's top answers
  const answersResponse = await fetch(
    `https://api.stackexchange.com/2.3/users/${STACKOVERFLOW_USER_ID}/answers?order=desc&sort=votes&site=stackoverflow&pagesize=10`
  );

  if (!answersResponse.ok) {
    throw new Error(`Stack Exchange API error: ${answersResponse.status}`);
  }

  const answersData: StackExchangeResponse<StackExchangeAnswerItem> = await answersResponse.json();

  if (!answersData.items || answersData.items.length === 0) {
    return [];
  }

  // Step 2: Get unique question IDs from answers
  const questionIds = answersData.items.map((answer) => answer.question_id);

  // Create question lookup map for storing fetched question details
  const questionMap: Map<number, StackExchangeQuestionItem> = new Map();

  // Try to fetch question details, but continue even if it fails
  try {
    const questionsDirectResponse = await fetch(
      `https://api.stackexchange.com/2.3/questions/${questionIds.join(";")}?site=stackoverflow`
    );

    if (questionsDirectResponse.ok) {
      const questionsData: StackExchangeResponse<StackExchangeQuestionItem> =
        await questionsDirectResponse.json();
      questionsData.items.forEach((question) => {
        questionMap.set(question.question_id, question);
      });
    }
  } catch {
    // If question fetch fails, we'll use fallback values
  }

  // Step 4: Merge answers with question details
  // Note: Stack Exchange API doesn't return link field by default, so we construct it manually
  const answersWithQuestions: AnswerWithQuestion[] = answersData.items.map((answer) => {
    const question = questionMap.get(answer.question_id);
    // Construct the Stack Overflow answer permalink using the answer_id
    const answerLink = `https://stackoverflow.com/a/${answer.answer_id}`;
    return {
      answerId: answer.answer_id,
      questionId: answer.question_id,
      questionTitle: question?.title ?? `Question #${answer.question_id}`,
      isAccepted: answer.is_accepted,
      score: answer.score,
      link: answerLink,
      creationDate: answer.creation_date,
      tags: question?.tags ?? [],
    };
  });

  return answersWithQuestions;
};

// Fetcher for user profile
const fetchUserProfile = async (): Promise<StackOverflowUser | null> => {
  const response = await fetch(
    `https://api.stackexchange.com/2.3/users/${STACKOVERFLOW_USER_ID}?site=stackoverflow`
  );

  if (!response.ok) {
    throw new Error(`Stack Exchange API error: ${response.status}`);
  }

  const data: StackExchangeResponse<StackExchangeUserItem> = await response.json();

  if (!data.items || data.items.length === 0) {
    return null;
  }

  const userItem = data.items[0];
  return {
    reputation: userItem.reputation,
    badgeCounts: {
      gold: userItem.badge_counts.gold,
      silver: userItem.badge_counts.silver,
      bronze: userItem.badge_counts.bronze,
    },
    profileImage: userItem.profile_image,
    displayName: userItem.display_name,
  };
};

// Custom hook to fetch Stack Overflow answers and user profile using SWR
// Fetches answers first, then fetches question details for titles and tags
const useStackOverflow = (): UseStackOverflowResult => {
  // Fetch user profile using centralized SWR config
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useSWR<StackOverflowUser | null>("stackoverflow-user", fetchUserProfile, standardSwrConfig);

  // Fetch answers with question details using centralized SWR config
  const {
    data: answersData,
    isLoading: answersLoading,
    error: answersError,
  } = useSWR<AnswerWithQuestion[]>(
    "stackoverflow-answers",
    fetchAnswersWithQuestions,
    standardSwrConfig
  );

  // Transform to our StackOverflowAnswer type
  const answers: StackOverflowAnswer[] = answersData ?? [];

  return {
    answers,
    user: user ?? null,
    isLoading: userLoading || answersLoading,
    isError: Boolean(userError || answersError),
  };
};

export default useStackOverflow;
