import { NextResponse } from "next/server";

// Gerrit configuration
const GERRIT_URL = "https://go-review.googlesource.com";
const GERRIT_EMAIL = "nhan13574@gmail.com";
const GERRIT_PROJECT = "go";

interface GerritChange {
  id: string;
  _number: number;
  subject: string;
  status: string;
  created: string;
  updated: string;
  insertions: number;
  deletions: number;
}

// Server-side API route to fetch Gerrit contributions (bypasses CORS)
export async function GET() {
  try {
    const apiUrl = `${GERRIT_URL}/changes/?q=owner:${encodeURIComponent(GERRIT_EMAIL)}&n=20&o=DETAILED_ACCOUNTS`;

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Gerrit API error: ${response.status}` },
        { status: response.status }
      );
    }

    const text = await response.text();
    // Remove Gerrit's XSSI protection prefix )]}'
    const jsonText = text.replace(/^\)\]\}'?\n?/, "");
    const changes: GerritChange[] = JSON.parse(jsonText);

    // Transform to our contribution format
    const contributions = changes.map((change) => {
      let status: "merged" | "open" | "closed" = "open";
      if (change.status === "MERGED") {
        status = "merged";
      } else if (change.status === "ABANDONED") {
        status = "closed";
      }

      return {
        id: `gerrit-${GERRIT_PROJECT}-${change._number}`,
        repo: GERRIT_PROJECT,
        repoName: "Go",
        type: "pr",
        title: change.subject,
        description: change.subject,
        url: `${GERRIT_URL}/c/${GERRIT_PROJECT}/+/${change._number}`,
        date: change.created.split(" ")[0],
        // For "Last Updated" sorting - use updated timestamp from Gerrit
        updatedAt: change.updated.split(" ")[0],
        status: status,
        additions: change.insertions || 0,
        deletions: change.deletions || 0,
        files: [],
        source: "gerrit",
      };
    });

    return NextResponse.json(contributions);
  } catch (error) {
    console.error("Gerrit API error:", error);
    return NextResponse.json({ error: "Failed to fetch Gerrit contributions" }, { status: 500 });
  }
}
