type Template = {
  [section: string]: {
    [subcategory: string]: { rating: number; description: string }[];
  };
};

export const templateData: Template = {
  Readings: {
    frequency: [
      { rating: 0, description: "None" },
      { rating: 1, description: "Minimal amount" },
      { rating: 2, description: "Moderate amount" },
      { rating: 3, description: "High amount" },
    ],
  },
  Lectures: {
    frequency: [
      { rating: 0, description: "None" },
      { rating: 1, description: "Minimal amount" },
      { rating: 2, description: "Moderate amount" },
      { rating: 3, description: "High amount" },
    ],
    participation: [
      { rating: 0, description: "Ungraded" },
      { rating: 1, description: "Participation in lectures graded" },
    ],
  },
  "Classwork and Homework": {
    frequency: [
      { rating: 0, description: "Never or rarely" },
      { rating: 1, description: "Weekly" },
      { rating: 2, description: "Semi-weekly" },
      { rating: 3, description: "Daily" },
    ],
    significance: [
      { rating: 0, description: "Ungraded" },
      { rating: 1, description: "Marginally significant to grade" },
      { rating: 2, description: "Moderately signifcant to grade" },
      { rating: 3, description: "Very signifcant to grade" },
      { rating: 4, description: "Exceptionally significant to grade" },
    ],
    rigor: [
      { rating: 0, description: "Completion grade" },
      { rating: 1, description: "Marginally rigorous" },
      { rating: 2, description: "Moderately rigorous" },
      { rating: 3, description: "Very rigorous" },
      { rating: 4, description: "Exceptionally rigorous" },
    ],
  },
  "Scheduled assessments": {
    frequency: [
      { rating: 0, description: "Never or rarely" },
      { rating: 1, description: "Bi-monthly" },
      { rating: 2, description: "Monthly" },
      { rating: 3, description: "Bi-weekly" },
      { rating: 4, description: "Weekly" },
    ],
    significance: [
      { rating: 0, description: "Ungraded" },
      { rating: 1, description: "Marginally significant to grade" },
      { rating: 2, description: "Moderately signifcant to grade" },
      { rating: 3, description: "Very signifcant to grade" },
      { rating: 4, description: "Exceptionally significant to grade" },
    ],
    rigor: [
      { rating: 0, description: "Completion grade" },
      { rating: 1, description: "Marginally rigorous" },
      { rating: 2, description: "Moderately rigorous" },
      { rating: 3, description: "Very rigorous" },
      { rating: 4, description: "Exceptionally rigorous" },
    ],
  },
  Essays: {
    frequency: [
      { rating: 0, description: "Never or rarely" },
      { rating: 1, description: "Bi-monthly" },
      { rating: 2, description: "Monthly" },
      { rating: 3, description: "Bi-weekly" },
      { rating: 4, description: "Weekly" },
    ],
    significance: [
      { rating: 0, description: "Ungraded" },
      { rating: 1, description: "Marginally significant to grade" },
      { rating: 2, description: "Moderately signifcant to grade" },
      { rating: 3, description: "Very signifcant to grade" },
      { rating: 4, description: "Exceptionally significant to grade" },
    ],
    rigor: [
      { rating: 0, description: "Completion grade" },
      { rating: 1, description: "Marginally rigorous" },
      { rating: 2, description: "Moderately rigorous" },
      { rating: 3, description: "Very rigorous" },
      { rating: 4, description: "Exceptionally rigorous" },
    ],
  },
  "Pop quizzes": {
    frequency: [
      { rating: 0, description: "Never or rarely" },
      { rating: 1, description: "Bi-monthly" },
      { rating: 2, description: "Monthly" },
      { rating: 3, description: "Bi-weekly" },
      { rating: 4, description: "Weekly" },
    ],
    significance: [
      { rating: 0, description: "Ungraded" },
      { rating: 1, description: "Marginally significant to grade" },
      { rating: 2, description: "Moderately signifcant to grade" },
      { rating: 3, description: "Very signifcant to grade" },
      { rating: 4, description: "Exceptionally significant to grade" },
    ],
    rigor: [
      { rating: 0, description: "Completion grade" },
      { rating: 1, description: "Marginally rigorous" },
      { rating: 2, description: "Moderately rigorous" },
      { rating: 3, description: "Very rigorous" },
      { rating: 4, description: "Exceptionally rigorous" },
    ],
  },
  "Group projects": {
    frequency: [
      { rating: 0, description: "Never or rarely" },
      { rating: 1, description: "Bi-monthly" },
      { rating: 2, description: "Monthly" },
      { rating: 3, description: "Bi-weekly" },
      { rating: 4, description: "Weekly" },
    ],
    significance: [
      { rating: 0, description: "Ungraded" },
      { rating: 1, description: "Marginally significant to grade" },
      { rating: 2, description: "Moderately signifcant to grade" },
      { rating: 3, description: "Very signifcant to grade" },
      { rating: 4, description: "Exceptionally significant to grade" },
    ],
    rigor: [
      { rating: 0, description: "Completion grade" },
      { rating: 1, description: "Marginally rigorous" },
      { rating: 2, description: "Moderately rigorous" },
      { rating: 3, description: "Very rigorous" },
      { rating: 4, description: "Exceptionally rigorous" },
    ],
  },
  "Extra credit": {
    frequency: [
      { rating: 0, description: "Never or rarely" },
      { rating: 1, description: "Bi-monthly" },
      { rating: 2, description: "Monthly" },
      { rating: 3, description: "Bi-weekly" },
      { rating: 4, description: "Weekly" },
    ],
    significance: [
      { rating: 0, description: "Ungraded" },
      { rating: 1, description: "Marginally significant to grade" },
      { rating: 2, description: "Moderately signifcant to grade" },
      { rating: 3, description: "Very signifcant to grade" },
      { rating: 4, description: "Exceptionally significant to grade" },
    ],
    
  },
  
};
