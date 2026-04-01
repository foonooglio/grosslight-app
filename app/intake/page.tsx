'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useLanguage } from '@/hooks/useLanguage'

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1'
const textareaClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm min-h-[80px]'

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-2">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="accent-[#15803d]"
          />
          <span className="text-sm text-gray-700">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}

export default function IntakePage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [authChecked, setAuthChecked] = useState(false)

  // Section 1
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [cityState, setCityState] = useState('')
  const [country, setCountry] = useState('')
  const [industry, setIndustry] = useState('')
  const [clientType, setClientType] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [referralSource, setReferralSource] = useState('')

  // Section 2
  const [solutionInMind, setSolutionInMind] = useState('')

  // Type A
  const [appDoes, setAppDoes] = useState('')
  const [numUsers, setNumUsers] = useState('')
  const [jobsAccomplish, setJobsAccomplish] = useState('')
  const [infoToTrack, setInfoToTrack] = useState('')
  const [threeFeatures, setThreeFeatures] = useState('')
  const [connectToExisting, setConnectToExisting] = useState('')
  const [connectDetails, setConnectDetails] = useState('')
  const [seenSimilar, setSeenSimilar] = useState('')
  const [whereUse, setWhereUse] = useState('')
  const [neverDoShow, setNeverDoShow] = useState('')
  const [deadlineA, setDeadlineA] = useState('')
  const [deadlineDateA, setDeadlineDateA] = useState('')
  const [colors, setColors] = useState('')
  const [accessLevels, setAccessLevels] = useState('')
  const [complianceA, setComplianceA] = useState('')
  const [complianceDetailsA, setComplianceDetailsA] = useState('')
  const [anythingElseA, setAnythingElseA] = useState('')

  // Type B
  const [whatYouDo, setWhatYouDo] = useState('')
  const [problemSolve, setProblemSolve] = useState('')
  const [problemGone, setProblemGone] = useState('')
  const [howOften, setHowOften] = useState('')
  const [howMany, setHowMany] = useState('')
  const [costYou, setCostYou] = useState('')
  const [currentlyHandling, setCurrentlyHandling] = useState('')
  const [wrongWithCurrent, setWrongWithCurrent] = useState('')
  const [triedAnything, setTriedAnything] = useState('')
  const [whoElse, setWhoElse] = useState('')
  const [deadlineB, setDeadlineB] = useState('')
  const [deadlineDateB, setDeadlineDateB] = useState('')
  const [complianceB, setComplianceB] = useState('')
  const [complianceDetailsB, setComplianceDetailsB] = useState('')
  const [anythingElseB, setAnythingElseB] = useState('')

  const [submitting, setSubmitting] = useState(false)

  function fillTestDataB() {
    // Type B — Luis Montalvo / Iglesias Dairy (problem-minded)
    setFirstName('Luis')
    setLastName('Montalvo')
    setPhone('787-555-0300')
    setCityState('Hatillo, PR')
    setCountry('Puerto Rico')
    setIndustry('Dairy Farm Management')
    setClientType('business')
    setCompanyName('Iglesias Dairy')
    setJobTitle('Farm Owner')
    setReferralSource('other')
    setSolutionInMind('no')
    setWhatYouDo('My son runs a vegetable and dairy farm in Hatillo, Puerto Rico. I oversee operations and manage the workforce.')
    setProblemSolve('His employees stand around doing nothing a lot. We have no way to see what tasks are actually getting done during the day.')
    setProblemGone('The farm would be more active and lots of new projects could be undertaken. We could grow faster.')
    setHowOften('daily')
    setHowMany('9 employees across the farm')
    setCostYou('Lost productivity every day. We lose thousands when people are idle and we have no visibility into why.')
    setCurrentlyHandling('I expect them to listen and do what I tell them verbally. Jorge uses a whiteboard and writes down tasks but nobody updates it.')
    setWrongWithCurrent('Finished activity updates do not happen so no one knows what actually gets finished. People forget or ignore the whiteboard.')
    setTriedAnything('No, the whiteboard was the newest solution we tried.')
    setWhoElse('Me, Jorge, Charles, Noel, Macho, Jean, Ashley, Edwin, and Zion.')
    setDeadlineB('no')
    setComplianceB('no')
    setAnythingElseB('We need something simple that workers will actually use. They are not tech savvy.')
  }

  function fillTestDataC() {
    // Real Jorge Montalvo submission — Type B
    setFirstName('Jorge')
    setLastName('Montalvo')
    setPhone('787-555-0400')
    setCityState('Arecibo, PR')
    setCountry('Puerto Rico')
    setIndustry('Agricultor')
    setClientType('business')
    setCompanyName('Puerto Rico Greens LLC')
    setJobTitle('President')
    setReferralSource('other')
    setSolutionInMind('no')
    setWhatYouDo('President of Puerto Rico Greens LLC. I make sure things happen with the least risk possible across 3 farms.')
    setProblemSolve('Making employees more productive and reliable so I can have a life. There are many farms to run and I cannot concentrate on one.')
    setProblemGone('I can concentrate on the next projects — government permits are long and hard to get and I need time to focus on them.')
    setHowOften('multiple_times_day')
    setHowMany('15 employees across 3 farms')
    setCostYou('Because there are many farms to run, I cannot concentrate on one at a time. Time management between 3 farms is the main issue.')
    setCurrentlyHandling('Dividing the days and the mornings between farms.')
    setWrongWithCurrent('Organization — there is none right now.')
    setTriedAnything('Increased salaries, provided machines to facilitate field work, brought more employees.')
    setWhoElse('Time management between 3 farms affects everyone.')
    setDeadlineB('yes')
    setDeadlineDateB('2026-03-31')
    setComplianceB('no')
    setAnythingElseB('Government permits require a lot of attention and I need to free up mental space to focus on them.')
  }

  function fillTestDataD() {
    // Carl Carlson — B2C, simple tic-tac-toe, 2 player only
    setFirstName('Carl')
    setLastName('Carlson')
    setPhone('555-000-0000')
    setCityState('Springfield, IL')
    setCountry('United States')
    setIndustry('Consumer / Personal Use')
    setClientType('personal')
    setReferralSource('other')
    setSolutionInMind('yes')
    setAppDoes('A tic-tac-toe game I can play on my phone with my kids. Two players take turns on the same device.')
    setNumUsers('2_10')
    setJobsAccomplish('Play a quick game with my kids without needing internet or downloads.')
    setInfoToTrack('Game score across rounds')
    setThreeFeatures('1. Two player mode on same phone\n2. Score tracking across multiple rounds\n3. Simple reset button to start a new game')
    setConnectToExisting('no')
    setSeenSimilar('Any basic tic-tac-toe app')
    setWhereUse('both')
    setNeverDoShow('No ads, no accounts required')
    setDeadlineA('no')
    setColors('Fun and colorful — blue X and red O on white background')
    setAnythingElseA('Keep it very simple. My kids are young.')
  }

  function fillTestData() {
    // Profile
    setFirstName('Jorge')
    setLastName('Montalvo')
    setPhone('787-555-0200')
    setCityState('San Juan, PR')
    setCountry('United States')
    setIndustry('Dairy Farm Management')
    setClientType('business')
    setCompanyName('Iglesias Dairy')
    setJobTitle('Farm Manager')
    setReferralSource('other')
    // Project
    setSolutionInMind('yes')
    setAppDoes('An app that tracks farm employees daily work activities, assignments, and inputs like chemicals and mix ratios across multiple farm locations.')
    setNumUsers('2_10')
    setJobsAccomplish('Make sure employees always know what to do. Allow managers to see what was done each day without being on-site. Track chemical usage for compliance.')
    setInfoToTrack('Farm locations\nEmployee assignments\nDaily activities\nChemicals and mix ratios\nCompletion status')
    setThreeFeatures('1. Kanban board showing daily tasks per employee\n2. Chemical log with mix ratios\n3. Manager dashboard with cross-farm overview')
    setConnectToExisting('no')
    setSeenSimilar('Jira — but way simpler and mobile-first for farm workers')
    setWhereUse('both')
    setNeverDoShow('Only managers can see settings and reports. Workers see only their own tasks.')
    setDeadlineA('no')
    setColors('Green and white — clean agricultural feel')
    setAccessLevels('yes')
    setComplianceA('no')
    setAnythingElseA('Workers use Android phones in the field. Internet is spotty. Offline mode is important.')
  }
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace('/')
      } else {
        setUserId(data.user.id)
        setUserEmail(data.user.email ?? null)
        // Pre-fill name from metadata if available
        const meta = data.user.user_metadata
        if (meta?.first_name) setFirstName(meta.first_name)
        if (meta?.last_name) setLastName(meta.last_name)
      }
      setAuthChecked(true)
    })
  }, [])

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const isBusiness = clientType === 'business'
  const typeA = solutionInMind === 'yes'
  const typeB = solutionInMind === 'no' || solutionInMind === 'notsure'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const answers = typeA
      ? {
          appDoes,
          numUsers,
          jobsAccomplish,
          infoToTrack,
          threeFeatures,
          connectToExisting,
          connectDetails: connectToExisting === 'yes' ? connectDetails : '',
          seenSimilar,
          whereUse,
          neverDoShow,
          deadline: deadlineA,
          deadlineDate: deadlineA === 'yes' ? deadlineDateA : '',
          colors,
          accessLevels: isBusiness ? accessLevels : '',
          compliance: isBusiness ? complianceA : '',
          complianceDetails: isBusiness && complianceA === 'yes' ? complianceDetailsA : '',
          anythingElse: anythingElseA,
        }
      : {
          whatYouDo,
          problemSolve,
          problemGone,
          howOften,
          howMany,
          costYou,
          currentlyHandling,
          wrongWithCurrent,
          triedAnything,
          whoElse,
          deadline: deadlineB,
          deadlineDate: deadlineB === 'yes' ? deadlineDateB : '',
          compliance: complianceB,
          complianceDetails: complianceB === 'yes' ? complianceDetailsB : '',
          anythingElse: anythingElseB,
        }

    const { error: dbError } = await supabase.from('intake_submissions').insert({
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      email: userEmail,
      phone,
      city_state: cityState,
      country,
      industry,
      company_name: companyName,
      job_title: jobTitle,
      referral_source: referralSource,
      client_type: clientType,
      solution_in_mind: solutionInMind,
      intake_type: typeA ? 'A' : 'B',
      answers,
    })

    if (dbError) {
      setError(dbError.message)
      setSubmitting(false)
    } else {
      setSubmitted(true)
      setTimeout(() => router.push('/schedule'), 1000)
    }
  }

  const sectionHeaderClass =
    'text-base font-bold text-[#15803d] mb-4 mt-2 pb-2 border-b border-green-100'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">{t.intakeTitle}</h1>

      {/* Test data button */}
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={fillTestData} className="py-2 border-2 border-dashed border-gray-300 text-gray-400 text-xs rounded-lg hover:border-green-400 hover:text-green-600 transition">⚡ A — Jorge</button>
        <button type="button" onClick={fillTestDataB} className="py-2 border-2 border-dashed border-gray-300 text-gray-400 text-xs rounded-lg hover:border-blue-400 hover:text-blue-600 transition">⚡ B — Luis</button>
        <button type="button" onClick={fillTestDataC} className="py-2 border-2 border-dashed border-gray-300 text-gray-400 text-xs rounded-lg hover:border-orange-400 hover:text-orange-600 transition">⚡ B — Jorge Real</button>
        <button type="button" onClick={fillTestDataD} className="py-2 border-2 border-dashed border-gray-300 text-gray-400 text-xs rounded-lg hover:border-purple-400 hover:text-purple-600 transition">⚡ A — Carl (test)</button>
      </div>

      {/* Section 1 */}
      <section className="space-y-4">
        <h2 className={sectionHeaderClass}>{t.section1}</h2>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>{t.firstName}</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t.lastName}</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t.phone}</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>{t.cityState}</label>
          <input
            type="text"
            value={cityState}
            onChange={e => setCityState(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>{t.country}</label>
          <input
            type="text"
            value={country}
            onChange={e => setCountry(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>{t.industry}</label>
          <input
            type="text"
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            placeholder={t.industryPlaceholder}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>{t.clientType}</label>
          <RadioGroup
            name="clientType"
            options={[
              { label: t.forBusiness, value: 'business' },
              { label: t.forPersonal, value: 'personal' },
            ]}
            value={clientType}
            onChange={setClientType}
          />
        </div>

        {isBusiness && (
          <>
            <div>
              <label className={labelClass}>{t.companyName}</label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t.jobTitle}</label>
              <input
                type="text"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                className={inputClass}
              />
            </div>
          </>
        )}

        <div>
          <label className={labelClass}>{t.referralSource}</label>
          <select
            value={referralSource}
            onChange={e => setReferralSource(e.target.value)}
            className={inputClass}
          >
            <option value="">—</option>
            <option value="google">{t.googleSearch}</option>
            <option value="referral">{t.referral}</option>
            <option value="social">{t.socialMedia}</option>
            <option value="other">{t.other}</option>
          </select>
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4">
        <h2 className={sectionHeaderClass}>{t.section2}</h2>

        <div>
          <label className={labelClass}>{t.solutionInMind}</label>
          <RadioGroup
            name="solutionInMind"
            options={[
              { label: t.yesKnowWhatIWant, value: 'yes' },
              { label: t.noJustKnowProblem, value: 'no' },
              { label: t.notSure, value: 'notsure' },
            ]}
            value={solutionInMind}
            onChange={setSolutionInMind}
          />
        </div>

        {/* Type A */}
        {typeA && (
          <div className="space-y-4 pt-2">
            <div>
              <label className={labelClass}>{t.appDoes}</label>
              <textarea
                value={appDoes}
                onChange={e => setAppDoes(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.numUsers}</label>
              <select
                value={numUsers}
                onChange={e => setNumUsers(e.target.value)}
                className={inputClass}
              >
                <option value="">—</option>
                <option value="just_me">{t.justMe}</option>
                <option value="2_10">{t.twoToTen}</option>
                <option value="11_50">{t.elevenToFifty}</option>
                <option value="51_200">{t.fiftyOneToTwoHundred}</option>
                <option value="200+">{t.twoHundredPlus}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{t.jobsAccomplish}</label>
              <textarea
                value={jobsAccomplish}
                onChange={e => setJobsAccomplish(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.infoToTrack}</label>
              <textarea
                value={infoToTrack}
                onChange={e => setInfoToTrack(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.threeFeatures}</label>
              <textarea
                value={threeFeatures}
                onChange={e => setThreeFeatures(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.connectToExisting}</label>
              <RadioGroup
                name="connectToExisting"
                options={[
                  { label: t.yes, value: 'yes' },
                  { label: t.no, value: 'no' },
                  { label: t.notSure, value: 'notsure' },
                ]}
                value={connectToExisting}
                onChange={setConnectToExisting}
              />
              {connectToExisting === 'yes' && (
                <textarea
                  value={connectDetails}
                  onChange={e => setConnectDetails(e.target.value)}
                  placeholder={t.connectDetails}
                  className={`${textareaClass} mt-2`}
                />
              )}
            </div>

            <div>
              <label className={labelClass}>{t.seenSimilar}</label>
              <textarea
                value={seenSimilar}
                onChange={e => setSeenSimilar(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.whereUse}</label>
              <RadioGroup
                name="whereUse"
                options={[
                  { label: t.atDesk, value: 'desk' },
                  { label: t.onTheGo, value: 'on_the_go' },
                  { label: t.both, value: 'both' },
                ]}
                value={whereUse}
                onChange={setWhereUse}
              />
            </div>

            <div>
              <label className={labelClass}>{t.neverDoShow}</label>
              <textarea
                value={neverDoShow}
                onChange={e => setNeverDoShow(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.deadline}</label>
              <RadioGroup
                name="deadlineA"
                options={[
                  { label: t.yes, value: 'yes' },
                  { label: t.no, value: 'no' },
                  { label: t.flexible, value: 'flexible' },
                ]}
                value={deadlineA}
                onChange={setDeadlineA}
              />
              {deadlineA === 'yes' && (
                <input
                  type="date"
                  value={deadlineDateA}
                  onChange={e => setDeadlineDateA(e.target.value)}
                  className={`${inputClass} mt-2`}
                />
              )}
            </div>

            <div>
              <label className={labelClass}>{t.colors}</label>
              <input
                type="text"
                value={colors}
                onChange={e => setColors(e.target.value)}
                placeholder={t.colorsPlaceholder}
                className={inputClass}
              />
            </div>

            {isBusiness && (
              <>
                <div>
                  <label className={labelClass}>{t.accessLevels}</label>
                  <RadioGroup
                    name="accessLevels"
                    options={[
                      { label: t.yes, value: 'yes' },
                      { label: t.no, value: 'no' },
                      { label: t.notSure, value: 'notsure' },
                    ]}
                    value={accessLevels}
                    onChange={setAccessLevels}
                  />
                </div>

                <div>
                  <label className={labelClass}>{t.compliance}</label>
                  <RadioGroup
                    name="complianceA"
                    options={[
                      { label: t.yes, value: 'yes' },
                      { label: t.no, value: 'no' },
                      { label: t.notSure, value: 'notsure' },
                    ]}
                    value={complianceA}
                    onChange={setComplianceA}
                  />
                  {complianceA === 'yes' && (
                    <textarea
                      value={complianceDetailsA}
                      onChange={e => setComplianceDetailsA(e.target.value)}
                      placeholder={t.complianceDetails}
                      className={`${textareaClass} mt-2`}
                    />
                  )}
                </div>
              </>
            )}

            <div>
              <label className={labelClass}>{t.anythingElse}</label>
              <textarea
                value={anythingElseA}
                onChange={e => setAnythingElseA(e.target.value)}
                className={textareaClass}
              />
            </div>
          </div>
        )}

        {/* Type B */}
        {typeB && (
          <div className="space-y-4 pt-2">
            <div>
              <label className={labelClass}>{t.whatYouDo}</label>
              <textarea
                value={whatYouDo}
                onChange={e => setWhatYouDo(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.problemSolve}</label>
              <textarea
                value={problemSolve}
                onChange={e => setProblemSolve(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.problemGone}</label>
              <textarea
                value={problemGone}
                onChange={e => setProblemGone(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.howOften}</label>
              <select
                value={howOften}
                onChange={e => setHowOften(e.target.value)}
                className={inputClass}
              >
                <option value="">—</option>
                <option value="multiple_times_day">{t.multipleTimesDay}</option>
                <option value="daily">{t.daily}</option>
                <option value="few_times_week">{t.fewTimesWeek}</option>
                <option value="weekly_or_less">{t.weeklyOrLess}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{t.howMany}</label>
              <input
                type="text"
                value={howMany}
                onChange={e => setHowMany(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.costYou}</label>
              <textarea
                value={costYou}
                onChange={e => setCostYou(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.currentlyHandling}</label>
              <textarea
                value={currentlyHandling}
                onChange={e => setCurrentlyHandling(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.wrongWithCurrent}</label>
              <textarea
                value={wrongWithCurrent}
                onChange={e => setWrongWithCurrent(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.triedAnything}</label>
              <textarea
                value={triedAnything}
                onChange={e => setTriedAnything(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.whoElse}</label>
              <textarea
                value={whoElse}
                onChange={e => setWhoElse(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t.deadline}</label>
              <RadioGroup
                name="deadlineB"
                options={[
                  { label: t.yes, value: 'yes' },
                  { label: t.no, value: 'no' },
                  { label: t.flexible, value: 'flexible' },
                ]}
                value={deadlineB}
                onChange={setDeadlineB}
              />
              {deadlineB === 'yes' && (
                <input
                  type="date"
                  value={deadlineDateB}
                  onChange={e => setDeadlineDateB(e.target.value)}
                  className={`${inputClass} mt-2`}
                />
              )}
            </div>

            <div>
              <label className={labelClass}>{t.compliance}</label>
              <RadioGroup
                name="complianceB"
                options={[
                  { label: t.yes, value: 'yes' },
                  { label: t.no, value: 'no' },
                  { label: t.notSure, value: 'notsure' },
                ]}
                value={complianceB}
                onChange={setComplianceB}
              />
              {complianceB === 'yes' && (
                <textarea
                  value={complianceDetailsB}
                  onChange={e => setComplianceDetailsB(e.target.value)}
                  placeholder={t.complianceDetails}
                  className={`${textareaClass} mt-2`}
                />
              )}
            </div>

            <div>
              <label className={labelClass}>{t.anythingElse}</label>
              <textarea
                value={anythingElseB}
                onChange={e => setAnythingElseB(e.target.value)}
                className={textareaClass}
              />
            </div>
          </div>
        )}
      </section>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={submitting || submitted || !solutionInMind}
        className="w-full py-3 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-green-800 disabled:opacity-60 transition-colors text-sm"
      >
        {submitted ? t.submitted : submitting ? t.submitting : t.submit}
      </button>
    </form>
  )
}
