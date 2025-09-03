export const AI_PROVIDERS = {
    gpt: {
        name: "GPT",
        models: {
          "gpt-4o-mini": {
            id: "1",
            name: "GPT-4O Mini",
            maxTokens: 8192,
            description: "Optimized version of GPT-4, faster and more cost-effective"
          },
          "gpt-4o": {
            id: "2",
            name: "GPT-4O",
            maxTokens: 8192,
            description: "Full optimized version of GPT-4"
          },
          "gpt-4-turbo": {
            id: "3",
            name: "GPT-4 Turbo",
            maxTokens: 128000,
            description: "Latest GPT-4 model with larger context window"
          },
          "gpt-4": {
            id: "4",
            name: "GPT-4",
            maxTokens: 8192,
            description: "Standard GPT-4 model"
          }
        }
      },
      gemini: {
        name: "Gemini",
        models: {
          "gemini-1.5-pro-002": {
            id: "1",
            name: "Gemini 1.5 Pro 002",
            maxTokens: 32768,
            description: "Latest version of Gemini Pro"
          },
          "gemini-1.5-pro": {
            id: "2",
            name: "Gemini 1.5 Pro",
            maxTokens: 32768,
            description: "Standard Gemini Pro model"
          },
          "gemini-1.5-flash": {
            id: "3",
            name: "Gemini 1.5 Flash",
            maxTokens: 32768,
            description: "Fast response Gemini model"
          },
          "gemini-1.5-flash-002": {
            id: "4",
            name: "Gemini 1.5 Flash 002",
            maxTokens: 32768,
            description: "Latest version of Gemini Flash"
          },
          "gemini-1.5-flash-8b": {
            id: "5",
            name: "Gemini 1.5 Flash 8B",
            maxTokens: 32768,
            description: "Lightweight Gemini Flash model"
          }
        }
      }
  };