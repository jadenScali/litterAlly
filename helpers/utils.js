import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { getSecureItem, getItemFor } from '../data/storageHelper';

export const resizeAndCompressImage = async (path) => {

  // Perform an initial trivial manipulation to get the dimensions without changing the image
  const initialResult = await manipulateAsync(
    path,
    [], // No modifications
    { compress: 1, format: SaveFormat.JPEG }
  );

  // Destructure width and height from the initial image
  const { width, height } = initialResult;

  // Calculate the aspect ratio and determine the new dimensions with no side exceeding 1024
  const maxDimension = 1024;
  let newWidth, newHeight;

  // Adjust dimensions while maintaining the aspect ratio depending on which dimension is larger
  if (width > height) {
    const scalingFactor = maxDimension / width;
    newWidth = maxDimension;
    newHeight = height * scalingFactor;
  } else {
    const scalingFactor = maxDimension / height;
    newHeight = maxDimension;
    newWidth = width * scalingFactor;
  }

  // Resize and compress the image
  const result = await manipulateAsync(
    path,
    [{ resize: { width: Math.round(newWidth), height: Math.round(newHeight) } }],
    { compress: 0.8, format: SaveFormat.JPEG }
  );

  // Return the URI of the resized and compressed image.
  return result.uri;
};

export const convertToBase64 = async (uri) => {
  return await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
};

// Function to analyze an image using OpenAI's API, particularly for identifying proper disposal methods
export const analyzeImageWithOpenAI = async (imageBase64) => {

  // Try to fetch the region from storage or default to "Halton"
  let savedRegion = await getItemFor('USER_REGION');

  // Securely fetch the API key
  const apiKey = await getSecureItem('API_KEY');

  // Use "Halton" as the default region if the saved region is not set
  if (!savedRegion) {
    savedRegion = "Halton";
  }

  // Prepare the parameters for the OpenAI API request, including the model and messages
  const params = {
    model: 'gpt-4o',
    tools: [{
      "type": "function",
        "function": {
            "name": "find_disposal_method",
            "description": "Based on the region determine how to dispose of the photo primary subject and briefly describe how to dispose of it.",
            "parameters": {
              "type": "object",
              "properties": {
                "category": {"type": "string", "enum": ["Recycle", "Compost", "Garbage", "Hazardous Waste", "Electronic Waste", "Human", "Invalid"]},
                "disposal_instructions": {
                  "type": "string",
                  "description": "2 sentence description on how to dispose of the item",
                },
              },
              "required": ["category", "disposal_instructions"],
          },
        }
    }],
    tool_choice: "required",
    messages: [{
      role: 'user',
      content: [
        {
          type: 'text',
          text:  `What is the proper way to dispose of the primary subject of this photo in ${savedRegion} Region Ontario Canada.`,
        },
        {
          type: 'image_url',
          image_url: {
            url: `data:image/jpeg;base64,${imageBase64}`,
            detail: "low"
          },
        },
      ],
    }]
  };
  
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  // Make the POST request to the OpenAI API with the prepared headers and body
  const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(params),
  });

  // Parse the JSON response from the API
  const jsonResponse = await response.json();

  console.log("API Response:");
  console.log(JSON.stringify(jsonResponse, null, 2));

  // Extract and parse the tool call arguments
  const toolCalls = jsonResponse.choices[0].message.tool_calls;
  const toolCall = toolCalls[0];
  const argumentsParsed = JSON.parse(toolCall.function.arguments);
  const { category, disposal_instructions } = argumentsParsed;

  console.log("Category:", category);
  console.log("Disposal Instructions:", disposal_instructions);

  return { category, disposal_instructions };
};

export const analyzeTextWithOpenAI = async (itemName) => {

  // Try to fetch the region from storage or default to "Halton"
  let savedRegion = await getItemFor('USER_REGION');

  // Securely fetch the API key
  const apiKey = await getSecureItem('API_KEY');

  // Use "Halton" as the default region if the saved region is not set
  if (!savedRegion) {
    savedRegion = "Halton";
  }

  // Prepare the parameters for the OpenAI API request, including the model and messages
  const params = {
    model: 'gpt-4o',
    tools: [{
      "type": "function",
        "function": {
            "name": "find_disposal_method",
            "description": "Based on the region determine how to dispose of an item and briefly describe how to dispose of it.",
            "parameters": {
              "type": "object",
              "properties": {
                "category": {"type": "string", "enum": ["Recycle", "Compost", "Garbage", "Hazardous Waste", "Electronic Waste", "Invalid", "Nonsense"]},
                "disposal_instructions": {
                  "type": "string",
                  "description": "2 sentence description on how to dispose of the item",
                },
              },
              "required": ["category", "disposal_instructions"],
          },
        }
    }],
    tool_choice: "required",
    messages: [{
      role: 'user',
      content: `What is the proper way to dispose of ${itemName} in ${savedRegion} Region Ontario Canada.`,
    }]
  };
  
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  // Make the POST request to the OpenAI API with the prepared headers and body
  const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(params),
  });

  // Parse the JSON response from the API
  const jsonResponse = await response.json();

  console.log("API Response:");
  console.log(JSON.stringify(jsonResponse, null, 2));

  // Extract and parse the tool call arguments
  const toolCalls = jsonResponse.choices[0].message.tool_calls;
  const toolCall = toolCalls[0];
  const argumentsParsed = JSON.parse(toolCall.function.arguments);
  const { category, disposal_instructions } = argumentsParsed;

  console.log("Category:", category);
  console.log("Disposal Instructions:", disposal_instructions);

  return { category, disposal_instructions };
}
