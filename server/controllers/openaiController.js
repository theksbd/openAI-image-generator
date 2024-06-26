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

    const url = 'https://open-ai21.p.rapidapi.com/texttoimage2';
    const options = {
    	method: 'POST',
    	headers: {
    		'content-type': 'application/json',
    		'X-RapidAPI-Key': process.env.OPENAI_API_KEY,
    		'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    	},
    	body: JSON.stringify({text: prompt})
    };

    const response = await fetch(url, options);
    const data = await response.json();

    return res.status(200).json({
      success: true,
      imageURL: data.generated_image
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
