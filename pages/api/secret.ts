import { getUser } from "./auth/[...thirdweb]";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async ({req, res}: any) => {
  // Get the authenticated user
  const user = await getUser(req);

  // Return a 401 unauthorized error if the user is not authenticated
  if (!user) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }

  // Return data that requires authentication
  return res.status(200).json({
    message: "This is a secret... don't tell anyone.",
  });
}

export default handler;