'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface IndustryDefaults {
  costPerLead: number
  closeRate: number
  avgRevenue: number
}

const INDUSTRY_DEFAULTS: Record<string, IndustryDefaults> = {
  'Life Insurance': { costPerLead: 3.0, closeRate: 3, avgRevenue: 1200 },
  'Health/ACA': { costPerLead: 3.5, closeRate: 2.5, avgRevenue: 800 },
  'Final Expense': { costPerLead: 2.0, closeRate: 1.5, avgRevenue: 450 },
  'Medicare': { costPerLead: 4.0, closeRate: 2, avgRevenue: 600 },
  'Mortgage (Purchase)': { costPerLead: 4.0, closeRate: 1.5, avgRevenue: 3000 },
  'Mortgage (Refinance)': { costPerLead: 3.0, closeRate: 2, avgRevenue: 2000 },
  'Solar': { costPerLead: 3.5, closeRate: 1.5, avgRevenue: 4000 },
  'Home Improvement': { costPerLead: 2.0, closeRate: 2, avgRevenue: 3500 },
  'Auto Insurance': { costPerLead: 1.5, closeRate: 2.5, avgRevenue: 400 },
  'P&C Insurance': { costPerLead: 2.0, closeRate: 2, avgRevenue: 600 },
  'Annuity': { costPerLead: 4.0, closeRate: 1.5, avgRevenue: 2500 },
  'Mortgage Protection': { costPerLead: 2.5, closeRate: 2, avgRevenue: 800 },
}

const LEAD_AGE_MULTIPLIERS: Record<string, number> = {
  'Aged (30-60 days)': 1.0,
  'Aged (60-180 days)': 0.7,
  'Aged (180+ days)': 0.4,
  'Fresh/Real-Time': 8.0,
}

const industries = Object.keys(INDUSTRY_DEFAULTS)
const leadTypes = Object.keys(LEAD_AGE_MULTIPLIERS)

export function ROICalculator() {
  const [industry, setIndustry] = useState('Life Insurance')
  const [leadType, setLeadType] = useState('Aged (30-60 days)')
  const [numLeads, setNumLeads] = useState(1000)
  const [costPerLead, setCostPerLead] = useState(3.0)
  const [closeRate, setCloseRate] = useState(3)
  const [avgRevenue, setAvgRevenue] = useState(1200)

  // Update defaults when industry or lead type changes
  function handleIndustryChange(newIndustry: string) {
    setIndustry(newIndustry)
    const defaults = INDUSTRY_DEFAULTS[newIndustry]
    if (defaults) {
      const multiplier = LEAD_AGE_MULTIPLIERS[leadType] || 1
      setCostPerLead(parseFloat((defaults.costPerLead * multiplier).toFixed(2)))
      setCloseRate(defaults.closeRate)
      setAvgRevenue(defaults.avgRevenue)
    }
  }

  function handleLeadTypeChange(newType: string) {
    setLeadType(newType)
    const defaults = INDUSTRY_DEFAULTS[industry]
    const multiplier = LEAD_AGE_MULTIPLIERS[newType] || 1
    if (defaults) {
      setCostPerLead(parseFloat((defaults.costPerLead * multiplier).toFixed(2)))
    }
  }

  const results = useMemo(() => {
    const totalInvestment = numLeads * costPerLead
    const expectedConversions = numLeads * (closeRate / 100)
    const expectedRevenue = expectedConversions * avgRevenue
    const roi = totalInvestment > 0 ? ((expectedRevenue - totalInvestment) / totalInvestment) * 100 : 0
    const cpa = expectedConversions > 0 ? totalInvestment / expectedConversions : 0
    const revenuePerLead = numLeads > 0 ? expectedRevenue / numLeads : 0
    const breakEvenLeads = avgRevenue > 0 && costPerLead > 0
      ? Math.ceil(avgRevenue / (avgRevenue * (closeRate / 100) > 0 ? costPerLead / (closeRate / 100) : costPerLead))
      : 0
    // Simpler break-even: how many leads to close ONE deal
    const leadsToOneDeal = closeRate > 0 ? Math.ceil(100 / closeRate) : 0
    const costToOneDeal = leadsToOneDeal * costPerLead

    return {
      totalInvestment,
      expectedConversions,
      expectedRevenue,
      roi,
      cpa,
      revenuePerLead,
      leadsToOneDeal,
      costToOneDeal,
    }
  }, [numLeads, costPerLead, closeRate, avgRevenue])

  const benchmarkDefaults = INDUSTRY_DEFAULTS[industry]
  const isPositiveROI = results.roi > 0

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Industry */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-secondary-800">
            Industry
          </label>
          <select
            value={industry}
            onChange={(e) => handleIndustryChange(e.target.value)}
            className="w-full rounded-none border-2 border-secondary-300 bg-white px-4 py-3 text-secondary-800 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* Lead Type */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-secondary-800">
            Lead Age
          </label>
          <select
            value={leadType}
            onChange={(e) => handleLeadTypeChange(e.target.value)}
            className="w-full rounded-none border-2 border-secondary-300 bg-white px-4 py-3 text-secondary-800 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            {leadTypes.map((lt) => (
              <option key={lt} value={lt}>{lt}</option>
            ))}
          </select>
        </div>

        {/* Number of Leads */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-secondary-800">
            Number of Leads
          </label>
          <input
            type="number"
            value={numLeads}
            onChange={(e) => setNumLeads(Math.max(0, parseInt(e.target.value) || 0))}
            min={0}
            step={100}
            className="w-full rounded-none border-2 border-secondary-300 px-4 py-3 text-secondary-800 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>

        {/* Cost Per Lead */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-secondary-800">
            Cost per Lead ($)
          </label>
          <input
            type="number"
            value={costPerLead}
            onChange={(e) => setCostPerLead(Math.max(0, parseFloat(e.target.value) || 0))}
            min={0}
            step={0.25}
            className="w-full rounded-none border-2 border-secondary-300 px-4 py-3 text-secondary-800 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
          />
          {benchmarkDefaults && (
            <p className="mt-1 text-xs text-secondary-500">
              Industry benchmark: ${benchmarkDefaults.costPerLead.toFixed(2)} (30-60 day)
            </p>
          )}
        </div>

        {/* Close Rate */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-secondary-800">
            Expected Close Rate (%)
          </label>
          <input
            type="number"
            value={closeRate}
            onChange={(e) => setCloseRate(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
            min={0}
            max={100}
            step={0.5}
            className="w-full rounded-none border-2 border-secondary-300 px-4 py-3 text-secondary-800 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
          />
          {benchmarkDefaults && (
            <p className="mt-1 text-xs text-secondary-500">
              Industry benchmark: {benchmarkDefaults.closeRate}%
            </p>
          )}
        </div>

        {/* Avg Revenue */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-secondary-800">
            Avg Revenue per Deal ($)
          </label>
          <input
            type="number"
            value={avgRevenue}
            onChange={(e) => setAvgRevenue(Math.max(0, parseFloat(e.target.value) || 0))}
            min={0}
            step={50}
            className="w-full rounded-none border-2 border-secondary-300 px-4 py-3 text-secondary-800 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
          />
          {benchmarkDefaults && (
            <p className="mt-1 text-xs text-secondary-500">
              Industry benchmark: ${benchmarkDefaults.avgRevenue.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      <div className={cn(
        'border-2 p-6 sm:p-8',
        isPositiveROI ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
      )}>
        <h3 className="mb-6 text-xl font-bold text-black font-serif">Your Results</h3>

        {/* ROI Hero Number */}
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary-500">
            Return on Investment
          </p>
          <p className={cn(
            'text-5xl font-bold sm:text-6xl',
            isPositiveROI ? 'text-green-700' : 'text-red-700'
          )}>
            {results.roi >= 0 ? '+' : ''}{results.roi.toFixed(0)}%
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ResultCard
            label="Total Investment"
            value={`$${results.totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          />
          <ResultCard
            label="Expected Conversions"
            value={results.expectedConversions.toFixed(1)}
          />
          <ResultCard
            label="Expected Revenue"
            value={`$${results.expectedRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            highlight={isPositiveROI}
          />
          <ResultCard
            label="Cost per Acquisition"
            value={`$${results.cpa.toFixed(2)}`}
          />
          <ResultCard
            label="Revenue per Lead"
            value={`$${results.revenuePerLead.toFixed(2)}`}
          />
          <ResultCard
            label="Leads to Close 1 Deal"
            value={`${results.leadsToOneDeal} leads ($${results.costToOneDeal.toFixed(2)})`}
          />
        </div>

        {/* Benchmark Comparison */}
        {benchmarkDefaults && (
          <div className="mt-6 border-t border-secondary-200 pt-6">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-secondary-500">
              vs. Industry Benchmarks
            </h4>
            <div className="grid gap-3 sm:grid-cols-3">
              <BenchmarkRow
                label="Close Rate"
                yours={`${closeRate}%`}
                benchmark={`${benchmarkDefaults.closeRate}%`}
                isAbove={closeRate >= benchmarkDefaults.closeRate}
              />
              <BenchmarkRow
                label="Cost/Lead"
                yours={`$${costPerLead.toFixed(2)}`}
                benchmark={`$${benchmarkDefaults.costPerLead.toFixed(2)}`}
                isAbove={costPerLead <= benchmarkDefaults.costPerLead}
              />
              <BenchmarkRow
                label="Deal Value"
                yours={`$${avgRevenue.toLocaleString()}`}
                benchmark={`$${benchmarkDefaults.avgRevenue.toLocaleString()}`}
                isAbove={avgRevenue >= benchmarkDefaults.avgRevenue}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ResultCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={cn(
      'bg-white border border-secondary-200 p-4',
      highlight && 'ring-2 ring-green-500'
    )}>
      <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-black">{value}</p>
    </div>
  )
}

function BenchmarkRow({ label, yours, benchmark, isAbove }: {
  label: string
  yours: string
  benchmark: string
  isAbove: boolean
}) {
  return (
    <div className="flex items-center justify-between bg-white border border-secondary-200 px-4 py-3">
      <div>
        <p className="text-xs font-semibold text-secondary-500">{label}</p>
        <p className="text-sm font-bold text-black">{yours}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-secondary-400">Benchmark</p>
        <p className="text-sm text-secondary-600">{benchmark}</p>
      </div>
      <span className={cn('ml-2 text-lg', isAbove ? 'text-green-600' : 'text-red-500')}>
        {isAbove ? '\u2713' : '\u2717'}
      </span>
    </div>
  )
}
