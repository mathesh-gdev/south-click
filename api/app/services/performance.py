from datetime import datetime
from api.app.schemas.models import PerformanceSettingsConfig, PerformanceCalculationResult

def calculate_performance(
    assigned_at: datetime,
    submitted_at: datetime,
    base_fee: float,
    config: PerformanceSettingsConfig = PerformanceSettingsConfig()
) -> PerformanceCalculationResult:
    """
    Calculates performance points and rupee rewards based on server-side turnaround duration.
    Rules:
      <= 2 hours: 500 points (Rs 250)
      2-3 hours: 400 points (Rs 200)
      3-4 hours: 300 points (Rs 150)
      4-5 hours: 200 points (Rs 100)
      > 5 hours: 0 points (Rs 0)
    Point conversion rate: 100 Points = Rs 50 (configurable)
    """
    duration_seconds = max(0.0, (submitted_at - assigned_at).total_seconds())
    duration_hours = round(duration_seconds / 3600.0, 2)

    if duration_hours <= config.tier_1_max_hours:
        points = config.tier_1_points
        tier = "Tier 1 (Sub-2h Elite)"
    elif duration_hours <= config.tier_2_max_hours:
        points = config.tier_2_points
        tier = "Tier 2 (2-3h Fast)"
    elif duration_hours <= config.tier_3_max_hours:
        points = config.tier_3_points
        tier = "Tier 3 (3-4h Standard)"
    elif duration_hours <= config.tier_4_max_hours:
        points = config.tier_4_points
        tier = "Tier 4 (4-5h Acceptable)"
    else:
        points = config.tier_5_points
        tier = "Tier 5 (>5h Standard Delivery)"

    reward_amount = round((points / 100.0) * config.rate_per_100_pts, 2)
    total_payable = round(base_fee + reward_amount, 2)

    return PerformanceCalculationResult(
        duration_hours=duration_hours,
        performance_points=points,
        performance_reward=reward_amount,
        tier_achieved=tier,
        base_fee=round(base_fee, 2),
        total_payable=total_payable
    )
