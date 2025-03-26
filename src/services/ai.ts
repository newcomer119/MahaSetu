// AI-based text analysis service
export const analyzeText = async (text: string) => {
    // Simulated AI analysis with sophisticated scoring
    const sentimentScore = calculateSentimentScore(text);
    const urgencyScore = detectUrgency(text);
    const category = categorizeText(text);
    
    return {
      sentiment: sentimentScore,
      urgency: urgencyScore,
      category,
      timestamp: new Date().toISOString()
    };
  };
  
  export const detectFraudScore = async (text: string) => {
    // Simulated fraud detection with pattern matching and risk analysis
    const score = calculateFraudRiskScore(text);
    
    return {
      score,
      confidence: 0.85 + Math.random() * 0.1,
      timestamp: new Date().toISOString()
    };
  };
  
  // Utility functions for text analysis
  function calculateSentimentScore(text: string): number {
    const negativeWords = ['bad', 'terrible', 'worst', 'poor', 'awful'];
    const urgentWords = ['immediate', 'urgent', 'emergency', 'critical'];
    
    const words = text.toLowerCase().split(' ');
    let score = 0.5; // Neutral baseline
    
    words.forEach(word => {
      if (negativeWords.includes(word)) score -= 0.1;
      if (urgentWords.includes(word)) score -= 0.15;
    });
    
    return Math.max(0, Math.min(1, score));
  }
  
  function detectUrgency(text: string): 'high' | 'medium' | 'low' {
    const urgentPhrases = ['immediate attention', 'urgent', 'emergency', 'asap', 'critical'];
    const text_lower = text.toLowerCase();
    
    if (urgentPhrases.some(phrase => text_lower.includes(phrase))) {
      return 'high';
    }
    
    const wordCount = text.split(' ').length;
    const exclamationCount = (text.match(/!/g) || []).length;
    
    if (exclamationCount > 2 || wordCount > 100) {
      return 'medium';
    }
    
    return 'low';
  }
  
  function categorizeText(text: string): string {
    const categories = {
      'infrastructure': ['road', 'bridge', 'building', 'construction', 'repair'],
      'sanitation': ['garbage', 'waste', 'cleaning', 'sewage', 'drainage'],
      'public-services': ['water', 'electricity', 'transport', 'service'],
      'safety': ['crime', 'accident', 'security', 'police', 'emergency']
    };
    
    const text_lower = text.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => text_lower.includes(keyword))) {
        return category;
      }
    }
    
    return 'other';
  }
  
  function calculateFraudRiskScore(text: string): number {
    const fraudIndicators = [
      'fake', 'scam', 'unauthorized', 'illegal',
      'multiple complaints', 'repeated', 'duplicate'
    ];
    
    const text_lower = text.toLowerCase();
    let riskScore = 0;
    
    fraudIndicators.forEach(indicator => {
      if (text_lower.includes(indicator)) {
        riskScore += 0.2;
      }
    });
    
    // Add randomness to simulate ML model variance
    riskScore += Math.random() * 0.1;
    
    return Math.min(1, riskScore);
  }