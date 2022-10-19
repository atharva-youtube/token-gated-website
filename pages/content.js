import React from "react";
import { checkEligibility } from "./api/auth/[...thirdweb]";

export default function Content() {
  return <div>Content</div>;
}

export async function getServerSideProps({ req }) {
  const eligible = await checkEligibility(req);
  if (!eligible)
    return {
      redirect: {
        destination: "/",
      },
    };

  return { props: {} };
}
