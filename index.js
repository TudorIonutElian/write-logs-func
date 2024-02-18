exports.handler = async (event) => {
    // Your Lambda function logic here
  
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      message: JSON.stringify(event),
      // Add more data as needed
    })
  };

  console.log(`Received event: ${JSON.stringify(event)}`);

  return response;
};