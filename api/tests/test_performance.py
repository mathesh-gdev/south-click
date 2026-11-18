from datetime import datetime, timedelta
import pytest
from api.app.services.performance import calculate_performance
from api.app.schemas.models import PerformanceSettingsConfig

def test_tier_1_sub_2_hours():
    assigned = datetime(2026, 10, 24, 10, 0, 0)
    submitted = assigned + timedelta(hours=1, minutes=45)
    base_fee = 1500.0

    result = calculate_performance(assigned, submitted, base_fee)

    assert result.duration_hours == 1.75
    assert result.performance_points == 500
    assert result.performance_reward == 250.0  # (500/100) * 50
    assert result.total_payable == 1750.0
    assert "Tier 1" in result.tier_achieved

def test_tier_2_between_2_and_3_hours():
    assigned = datetime(2026, 10, 24, 10, 0, 0)
    submitted = assigned + timedelta(hours=2, minutes=30)
    base_fee = 1500.0

    result = calculate_performance(assigned, submitted, base_fee)

    assert result.duration_hours == 2.5
    assert result.performance_points == 400
    assert result.performance_reward == 200.0
    assert result.total_payable == 1700.0
    assert "Tier 2" in result.tier_achieved

def test_tier_3_between_3_and_4_hours():
    assigned = datetime(2026, 10, 24, 10, 0, 0)
    submitted = assigned + timedelta(hours=3, minutes=40)
    base_fee = 1000.0

    result = calculate_performance(assigned, submitted, base_fee)

    assert result.duration_hours == 3.67
    assert result.performance_points == 300
    assert result.performance_reward == 150.0
    assert result.total_payable == 1150.0
    assert "Tier 3" in result.tier_achieved

def test_tier_4_between_4_and_5_hours():
    assigned = datetime(2026, 10, 24, 10, 0, 0)
    submitted = assigned + timedelta(hours=4, minutes=15)
    base_fee = 800.0

    result = calculate_performance(assigned, submitted, base_fee)

    assert result.duration_hours == 4.25
    assert result.performance_points == 200
    assert result.performance_reward == 100.0
    assert result.total_payable == 900.0
    assert "Tier 4" in result.tier_achieved

def test_tier_5_greater_than_5_hours_zero_bonus():
    assigned = datetime(2026, 10, 24, 10, 0, 0)
    submitted = assigned + timedelta(hours=6, minutes=0)
    base_fee = 1500.0

    result = calculate_performance(assigned, submitted, base_fee)

    assert result.duration_hours == 6.0
    assert result.performance_points == 0
    assert result.performance_reward == 0.0
    assert result.total_payable == 1500.0
    assert "Tier 5" in result.tier_achieved
