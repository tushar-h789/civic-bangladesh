import { HomeHero } from "@/components/civic/home-hero";
import { HomeIntroduction } from "@/components/civic/home-introduction";
import { HomeTopics } from "@/components/civic/home-topics";
import { HomeScenarios } from "@/components/civic/home-scenarios";
import { HomeChallenge } from "@/components/civic/home-challenge";
import { HomeCivicScore } from "@/components/civic/home-civic-score";
import { HomeFeaturedCourses } from "@/components/civic/home-featured-courses";
import { HomeFeaturedCampaigns } from "@/components/civic/home-featured-campaigns";
import { HomeStories } from "@/components/civic/home-stories";
import { HomeCivicPromise } from "@/components/civic/home-civic-promise";
import { HomeInstitutions } from "@/components/civic/home-institutions";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeIntroduction />
      <HomeTopics />
      <HomeScenarios />
      <HomeChallenge />
      <HomeCivicScore />
      <HomeFeaturedCourses />
      <HomeFeaturedCampaigns />
      <HomeStories />
      <HomeCivicPromise />
      <HomeInstitutions />
    </>
  );
}
