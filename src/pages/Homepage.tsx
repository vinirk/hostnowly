import { BackgroundSection, Heading } from "components/common";
import { HomepageBanner } from "components/layout";
import StaysList from "features/stays/StaysList";

const Homepage = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="container relative space-y-18 lg:space-y-20 mb-8 m-8 mx-auto">
        <HomepageBanner />
        <div className="relative py-10">
          <BackgroundSection>
            <Heading className="mb-10" desc="Find your perfect stay">
              Find your stay 🏖️
            </Heading>
            <StaysList />
          </BackgroundSection>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
