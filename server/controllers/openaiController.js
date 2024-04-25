const fetch = require('node-fetch');

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
      url: 'https://open-ai21.p.rapidapi.com/texttoimage2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.OPENAI_API_KEY,
        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
      },
      body: {text: imageConfig.prompt}
    };

    const response = await fetch(
      "https://open-ai21.p.rapidapi.com/texttoimage2",
      options
    );
    const data = await response.text();

    return res.status(200).json({
      success: true,
      imageURL: data
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
