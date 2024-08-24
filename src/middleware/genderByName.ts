import axios from "axios";

export const GenderByName = async (
  name: string,
): Promise<"male" | "female"> => {
  try {
    const response = await axios.get(
      `https://api.genderize.io?name=${name}&country_id=BR`,
    );

    const gender = response.data.gender;

    if (gender === "male" || gender === "female") {
      return gender;
    }
  } catch (error) {
    console.error(error);
  }

  throw new Error("Unable to determine gender.");
};
