const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const imageConfig = {
      prompt,
      n: 1,
      size: imageSize
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "09bbdb2a83msh1adc61b4fb8845cp17e44ejsn1d4b61caf649",
        "X-RapidAPI-Host": "openai80.p.rapidapi.com"
      },
      body: JSON.stringify(imageConfig)
    };

    const response = await fetch(
      "https://openai80.p.rapidapi.com/images/generations",
      options
    );
    const data = await response.json();

    return res.status(200).json({
      success: true,
      imageURL: data.data[0].url
    });
  } catch (error) {
    let errorResponse =
      "Your request could not be processed. Please try again.";
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      errorResponse = error.response.data.error.message;
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      message: "The image could not be generated",
      errorResponse
    });
  }
};

module.exports = {
  generateImage
};
