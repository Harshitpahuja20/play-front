import React from "react";

const DisclaimerPage = () => {
  return (
    <div style={styles.container}>
      <h1>Disclaimer - playwinindia.fun</h1>
      <p>
        playwinindia.fun provides no warranty or assurance of the accuracy or
        completeness of the content available on the playwinindia website. All
        the content or materials on the website including services, information,
        products, text, graphics and links are provided on an{" "}
        <strong>"AS IS"</strong> basis without any warranty of any kind.
      </p>

      <p>
        playwinindia.fun expressly disclaims all kinds of warranties, expressed
        or implied, related to the fitness and merchantability for a particular
        purpose, non-infringement of third parties, freedom from computer
        viruses, etc.
      </p>

      <p>
        playwinindia.fun does not warrant that the functions and services
        available on the website will be error-free and uninterrupted. It also
        does not warrant that the servers used for the website are free from
        computer viruses and other harmful materials.
      </p>

      <p>
        playwinindia.fun does not make any representations or assurances
        regarding the completeness, accuracy, adequacy, and reliability of the
        materials used on the website. Users should use the services and content
        on the website at their own risk, and playwinindia.fun will not be
        responsible for any damage to the users’ computers or anything else and
        hence will not bear the costs of the repair, servicing, or replacement
        of the users’ computers/products.
      </p>

      <p>
        playwinindia.fun does not endorse any advertisements hosted on the
        website. Users may view third-party advertisements and purchase the
        products advertised at their own risk.
      </p>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
};

export default DisclaimerPage;
