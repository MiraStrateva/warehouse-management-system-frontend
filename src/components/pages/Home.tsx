import PageContent from "../Shared/PageContent";
import homeImage from "../../../src/assets/home.jpg";

function HomePage() {
  return (
    <PageContent title="Welcome!">
      <p>Warehose Management System</p>
      <div className="main-image">
        <img src={homeImage} alt="A table full of delicious food!" />
      </div>
    </PageContent>
  );
}

export default HomePage;
