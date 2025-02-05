const metricsData = require("../data/mockData");

exports.getMetrics = (req, res) => {
  const { campaign_id } = req.query;
  
  if (campaign_id) {
    const filteredMetrics = metricsData.filter(
      (metric) => metric.campaign_id === campaign_id
    );
    return res.json(filteredMetrics);
  }
  
  res.json(metricsData);
};

exports.addMetric = (req, res) => {
  const { date, campaign_id, campaign_name, clicks, impressions, spend, conversions } = req.body;

  if (!date || !campaign_id || !campaign_name || !clicks || !impressions || !spend || !conversions) {
    return res.status(400).json({ error: "All fields are required." });
  }

 

  const newEntry = { date, campaign_id, campaign_name, clicks, impressions, spend, conversions };
  metricsData.push(newEntry);

  res.status(201).json(newEntry);
};
