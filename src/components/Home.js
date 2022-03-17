import React from "react";
function Home() {
  React.useEffect(() => {
    document.title = "Ablestate Cohorts | Home";
  }, []);
  return (
    <div className="container mx-auto p-4">
      <p>Welcome to the Ablestate Edu Center.</p>
    </div>
  );
}

export default Home;
