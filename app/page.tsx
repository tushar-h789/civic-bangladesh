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
import { HomePurpose } from "@/components/civic/home-purpose";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomePurpose />
      <HomeIntroduction />
      <HomeFeaturedCourses />
      <HomeTopics />
      <HomeScenarios />
      <HomeChallenge />
      <HomeCivicScore />
      <HomeFeaturedCampaigns />
      <HomeStories />
      <HomeCivicPromise />
      <HomeInstitutions />
    </>
  );
}
