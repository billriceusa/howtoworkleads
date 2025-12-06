'use client'

import { useState } from 'react'
import { Button, Input, Textarea } from '@/components/ui'
import { cn } from '@/lib/utils'

// Lead types available
const LEAD_TYPES = [
  { id: 'life-insurance', label: 'Life Insurance', description: 'Term, whole life, final expense leads' },
  { id: 'health-insurance', label: 'Health Insurance', description: 'ACA, Medicare, supplemental health leads' },
  { id: 'auto-insurance', label: 'Auto Insurance', description: 'Personal and commercial auto leads' },
  { id: 'home-insurance', label: 'Homeowner Insurance', description: 'Home, renters, and property leads' },
  { id: 'mortgage', label: 'Mortgage/Refinance', description: 'Purchase and refinance leads' },
  { id: 'solar', label: 'Solar Installation', description: 'Residential and commercial solar leads' },
  { id: 'final-expense', label: 'Final Expense', description: 'Burial and final expense insurance leads' },
  { id: 'medicare', label: 'Medicare', description: 'Medicare Advantage and supplement leads' },
  { id: 'annuity', label: 'Annuity', description: 'Fixed and variable annuity leads' },
  { id: 'other', label: 'Other', description: 'Other lead types not listed above' },
]

// Lead age options
const LEAD_AGE_OPTIONS = [
  { id: '0-30', label: '0-30 days', description: 'Fresh leads' },
  { id: '31-60', label: '31-60 days', description: 'Recent leads' },
  { id: '61-90', label: '61-90 days', description: 'Aged leads' },
  { id: '91-180', label: '91-180 days', description: 'Well-aged leads' },
  { id: '180+', label: '180+ days', description: 'Deeply aged leads' },
  { id: 'any', label: 'Any age', description: 'No preference' },
]

// Quantity options
const QUANTITY_OPTIONS = [
  { id: '100-500', label: '100-500 leads' },
  { id: '500-1000', label: '500-1,000 leads' },
  { id: '1000-5000', label: '1,000-5,000 leads' },
  { id: '5000-10000', label: '5,000-10,000 leads' },
  { id: '10000+', label: '10,000+ leads' },
  { id: 'custom', label: 'Custom quantity' },
]

// US States for targeting
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
]

interface FormData {
  // Step 1: Lead Type
  leadTypes: string[]
  otherLeadType: string

  // Step 2: Lead Specifications
  leadAge: string
  quantity: string
  customQuantity: string
  states: string[]
  allStates: boolean

  // Step 3: Contact Info
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string

  // Step 4: Additional Details
  additionalRequirements: string
  budget: string
  timeline: string
  howDidYouHear: string
}

const initialFormData: FormData = {
  leadTypes: [],
  otherLeadType: '',
  leadAge: '',
  quantity: '',
  customQuantity: '',
  states: [],
  allStates: true,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  additionalRequirements: '',
  budget: '',
  timeline: '',
  howDidYouHear: '',
}

export function LeadOrderForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const totalSteps = 4

  const updateFormData = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleLeadType = (typeId: string) => {
    setFormData(prev => ({
      ...prev,
      leadTypes: prev.leadTypes.includes(typeId)
        ? prev.leadTypes.filter(t => t !== typeId)
        : [...prev.leadTypes, typeId]
    }))
  }

  const toggleState = (state: string) => {
    setFormData(prev => ({
      ...prev,
      states: prev.states.includes(state)
        ? prev.states.filter(s => s !== state)
        : [...prev.states, state]
    }))
  }

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return formData.leadTypes.length > 0
      case 2:
        return formData.leadAge !== '' && formData.quantity !== ''
      case 3:
        return formData.firstName !== '' && formData.lastName !== '' &&
               formData.email !== '' && formData.phone !== ''
      case 4:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/lead-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-lg text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Inquiry!</h2>
        <p className="text-gray-600 mb-6">
          Your lead request has been submitted successfully. Check your email for a confirmation message.
          I&apos;ll review your requirements and get back to you shortly with a custom quote.
        </p>
        <p className="text-gray-600 mb-8">
          Want to discuss your needs right away?{' '}
          <a
            href="https://calendar.app.google/Kc6UTzAM5pn11ocv6"
            className="text-primary-800 font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a lead strategy call
          </a>
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setFormData(initialFormData)
            setStep(1)
            setStatus('idle')
          }}
        >
          Submit Another Request
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors',
                  s < step ? 'bg-green-600 text-white' :
                  s === step ? 'bg-primary-800 text-white' :
                  'bg-gray-200 text-gray-600'
                )}
              >
                {s < step ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : s}
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-primary-800 transition-all duration-300"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>Lead Type</span>
          <span>Specifications</span>
          <span>Contact Info</span>
          <span>Details</span>
        </div>
      </div>

      {/* Step 1: Lead Type Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">What type of leads are you looking for?</h2>
            <p className="text-gray-600 mb-6">Select all lead types that interest you.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LEAD_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => toggleLeadType(type.id)}
                className={cn(
                  'p-4 rounded-lg border-2 text-left transition-all',
                  formData.leadTypes.includes(type.id)
                    ? 'border-primary-800 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                    formData.leadTypes.includes(type.id)
                      ? 'border-primary-800 bg-primary-800'
                      : 'border-gray-300'
                  )}>
                    {formData.leadTypes.includes(type.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{type.label}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {formData.leadTypes.includes('other') && (
            <Input
              label="Please specify the lead type"
              placeholder="Enter the type of leads you're looking for"
              value={formData.otherLeadType}
              onChange={(e) => updateFormData('otherLeadType', e.target.value)}
            />
          )}
        </div>
      )}

      {/* Step 2: Lead Specifications */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Lead Specifications</h2>
            <p className="text-gray-600 mb-6">Tell us about your ideal lead criteria.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Lead Age Preference</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {LEAD_AGE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => updateFormData('leadAge', option.id)}
                  className={cn(
                    'p-3 rounded-lg border-2 text-center transition-all',
                    formData.leadAge === option.id
                      ? 'border-primary-800 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Quantity Needed</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {QUANTITY_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => updateFormData('quantity', option.id)}
                  className={cn(
                    'p-3 rounded-lg border-2 text-center transition-all',
                    formData.quantity === option.id
                      ? 'border-primary-800 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <div className="font-semibold text-gray-900">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {formData.quantity === 'custom' && (
            <Input
              label="Custom Quantity"
              placeholder="Enter the number of leads you need"
              value={formData.customQuantity}
              onChange={(e) => updateFormData('customQuantity', e.target.value)}
            />
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">Geographic Targeting</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.allStates}
                  onChange={(e) => updateFormData('allStates', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary-800 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600">All states</span>
              </label>
            </div>

            {!formData.allStates && (
              <div className="border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {US_STATES.map((state) => (
                    <label key={state} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.states.includes(state)}
                        onChange={() => toggleState(state)}
                        className="w-4 h-4 rounded border-gray-300 text-primary-800 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{state}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Contact Information */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your Contact Information</h2>
            <p className="text-gray-600 mb-6">How can we reach you with your custom quote?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name *"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => updateFormData('firstName', e.target.value)}
              required
            />
            <Input
              label="Last Name *"
              placeholder="Smith"
              value={formData.lastName}
              onChange={(e) => updateFormData('lastName', e.target.value)}
              required
            />
          </div>

          <Input
            type="email"
            label="Email Address *"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            required
          />

          <Input
            type="tel"
            label="Phone Number *"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            required
          />

          <Input
            label="Company/Agency Name (optional)"
            placeholder="ABC Insurance Agency"
            value={formData.company}
            onChange={(e) => updateFormData('company', e.target.value)}
          />
        </div>
      )}

      {/* Step 4: Additional Details */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Additional Details</h2>
            <p className="text-gray-600 mb-6">Help us understand your needs better.</p>
          </div>

          <Textarea
            label="Additional Requirements or Questions"
            placeholder="Tell us about any specific requirements, data fields needed, or questions you have..."
            value={formData.additionalRequirements}
            onChange={(e) => updateFormData('additionalRequirements', e.target.value)}
            rows={4}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">What&apos;s your budget range?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Under $500', '$500-$1,000', '$1,000-$5,000', '$5,000+'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateFormData('budget', option)}
                  className={cn(
                    'p-3 rounded-lg border-2 text-center transition-all text-sm',
                    formData.budget === option
                      ? 'border-primary-800 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">When do you need these leads?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['ASAP', 'This week', 'This month', 'Just exploring'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateFormData('timeline', option)}
                  className={cn(
                    'p-3 rounded-lg border-2 text-center transition-all text-sm',
                    formData.timeline === option
                      ? 'border-primary-800 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="How did you hear about us?"
            placeholder="Google, referral, social media, etc."
            value={formData.howDidYouHear}
            onChange={(e) => updateFormData('howDidYouHear', e.target.value)}
          />

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Request Summary</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">Lead Types:</dt>
                <dd className="text-gray-900 font-medium text-right">
                  {formData.leadTypes.map(t => LEAD_TYPES.find(lt => lt.id === t)?.label).join(', ')}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Lead Age:</dt>
                <dd className="text-gray-900 font-medium">
                  {LEAD_AGE_OPTIONS.find(o => o.id === formData.leadAge)?.label}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Quantity:</dt>
                <dd className="text-gray-900 font-medium">
                  {formData.quantity === 'custom' ? formData.customQuantity : QUANTITY_OPTIONS.find(o => o.id === formData.quantity)?.label}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">States:</dt>
                <dd className="text-gray-900 font-medium">
                  {formData.allStates ? 'All states' : formData.states.join(', ') || 'None selected'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="ghost"
          onClick={handleBack}
          disabled={step === 1}
          className={step === 1 ? 'invisible' : ''}
        >
          Back
        </Button>

        {step < totalSteps ? (
          <Button
            type="button"
            variant="primary"
            onClick={handleNext}
            disabled={!validateStep(step)}
          >
            Continue
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            isLoading={status === 'loading'}
          >
            Submit Request
          </Button>
        )}
      </div>
    </div>
  )
}
