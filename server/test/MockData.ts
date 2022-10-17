export class MockData{
  public static optimizelyMockResponse = {
    "confidence_threshold": 0.9,
    "end_time": "2022-10-05T18:00:00.000000Z",
    "experiment_id": 22025281356,
    "metrics": [
      {
        "aggregator": "unique",
        "event_id": 22029711635,
        "name": "Visit Page: BaliBlind | Swatches Page",
        "results": {
          "22011971374": {
            "is_baseline": false,
            "level": "variation",
            "lift": {
              "confidence_interval": [
                -0.03317974684625742,
                0.026561198626426138
              ],
              "is_significant": false,
              "lift_status": "worse",
              "significance": 0.0,
              "value": -0.004295790983993908,
              "visitors_remaining": 3556
            },
            "name": "Variation #1",
            "rate": 0.973305954825462,
            "samples": 487,
            "value": 474.0,
            "variance": 0.02598147312675772,
            "variation_id": "22011971374"
          },
          "22025721712": {
            "is_baseline": true,
            "level": "variation",
            "name": "Original",
            "rate": 0.9775051124744376,
            "samples": 489,
            "value": 478.0,
            "variance": 0.02198886756077469,
            "variation_id": "22025721712"
          }
        },
        "scope": "visitor",
        "winning_direction": "increasing"
      },
    ],
    "reach": {
      "baseline_count": 489,
      "baseline_reach": 0.5010245901639344,
      "total_count": 976,
      "treatment_count": 487,
      "treatment_reach": 0.4989754098360656,
      "variations": {
        "22011971374": {
          "count": 487,
          "name": "Variation #1",
          "variation_id": "22011971374",
          "variation_reach": 0.4989754098360656
        },
        "22025721712": {
          "count": 489,
          "name": "Original",
          "variation_id": "22025721712",
          "variation_reach": 0.5010245901639344
        }
      }
    },
    "start_time": "2022-09-30T18:00:00.000000Z",
    "stats_config": {
      "confidence_level": 0.9,
      "difference_type": "relative",
      "epoch_enabled": false
    }
  };
}