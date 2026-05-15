const axios = require('axios');

exports.getAICoaching = async (req, res) => {
  try {
    const { type, profile, stats } = req.body;

    const prompts = {
      meals: `Suggest 3 practical Indian meal ideas for a ${profile.age}yo ${profile.gender}, ${profile.weight}kg, goal: ${profile.goal}. Be concise.`,
      summary: `Give a brief health summary for ${profile.age}yo ${profile.gender}.`,
      workout: `Give 3 fitness tips for ${profile.age}yo ${profile.gender}.`,
      motivation: `Motivate someone working toward ${profile.goal} goal.`
    };

    const apiKey = process.env.CLAUDE_API_KEY;
    
    if (!apiKey) {
      // Return simulated response if no API key
      return res.json({
        success: true,
        message: getSimulatedResponse(type, profile)
      });
    }

    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompts[type] }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      }
    });

    const text = response.data.content?.map(c => c.text || '').join('') || 'No response generated.';
    
    res.json({ success: true, message: text });
  } catch (error) {
    console.error('AI Coach error:', error);
    res.status(500).json({ success: false, error: 'AI service unavailable' });
  }
};

function getSimulatedResponse(type, profile) {
  const responses = {
    meals: `Here are meal suggestions for your ${profile.goal} goal...`,
    summary: `Based on your profile, you're making good progress...`,
    workout: `Focus on form and progressive overload...`,
    motivation: `Keep pushing! You're doing great!`
  };
  return responses[type] || 'Keep up the great work!';
}