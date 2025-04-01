/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

export async function getUserStats() {
  try {
    const response = await API.get("/user");
    const userProfileData = response.data;
    const response1 = await API.get("/user/repos");
    const repos = response1.data;
    return {
      username: userProfileData.login,
      avatar: userProfileData.avatar_url,
      bio: userProfileData.bio,
      userView: userProfileData.html_url,
      location: userProfileData.location,
      userViewType: userProfileData.user_view_type,
      name: userProfileData.name,
      followers: userProfileData.followers,
      following: userProfileData.following,
      total_repos:
        userProfileData.public_repos + userProfileData.owned_private_repos,
      total_gists:
        userProfileData.public_gists + userProfileData.owned_private_gists,
      repos: repos
        .map((repo: any) => getRepoData(repo))
        .sort(
          (a: any, b: any) =>
            new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        ),
    };
  } catch (e) {
    return {
      error: "Something went wrong",
    };
  }
}

function getRepoData(repoData: any) {
  return {
    owner: repoData.owner.login,
    name: repoData.name,
    description: repoData.description,
    forks: repoData.forks,
    watchers: repoData.watchers,
    topics: repoData.topics,
    openIssues: repoData.open_issues_count,
    visibility: repoData.visibility,
    createdAt: repoData.created_at,
    updatedAt: repoData.updated_at,
    stars: repoData.stargazers_count,
    viewLink: `https://divyanshulohani.xyz/github/${repoData.name}`,
  };
}

export async function getRepositoryData(repoName: string) {
  try {
    const response = await API.get(`/repos/DivyanshuLohani/${repoName}`);
    const repoData = response.data;
    return getRepoData(repoData);
  } catch (e) {
    // Check if e is a type of axios repsonse
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 404) {
        return {
          error: "Repository not found",
        };
      }
    }
    return {
      error: "Something went wrong",
    };
  }
}

export async function createIssue(
  repoName: string,
  title: string,
  body: string
) {
  try {
    const response = await API.post(
      `/repos/DivyanshuLohani/${repoName}/issues`,
      {
        title,
        body,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    return {
      error: "Something went wrong",
    };
  }
}
