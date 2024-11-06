const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const scoreDisplay = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
//const timerElement = document.getElementById('time');
const saveButton = document.getElementById('save-btn');
const sendButton = document.getElementById('send-btn');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let totalTime; // Total quiz time (totalQuestions * 15)
let timerInterval;
let userChoices = []; // To store the user's choices
let selectedAnswerText = null; // To store the last selected answer
let correctAnswerText = null; // To store the correct answer for the current question
let numQuestionsToSolve; // Number of questions user wants to solve

const questions = [
    
    {
        question: "A braking action given by ATS of 0.25 and below is;",
        answers: [
          { text: "Medium.", correct: false },
          { text: "Good.", correct: false },
          { text: "Medium/poor.", correct: false },
          { text: "Poor.", correct: true }
        ]
      },
      {
        question: "A checklist of AIP supplements currently in force shall be issued at intervals of;",
        answers: [
          { text: "not more than three months.", correct: false },
          { text: "not more than one month.", correct: true },
          { text: "not more than 2 months.", correct: false },
          { text: "not more than 28 days.", correct: false }
        ]
      },
      {
        question: "A checklist of NOTAM currently in force shall be issued at the AFTN at intervals of;",
        answers: [
          { text: "not more than 28 days.", correct: false },
          { text: "not more than 15 days.", correct: false },
          { text: "not more than one month.", correct: true },
          { text: "not more than 10 days.", correct: false }
        ]
      },
      {
        question: "A circling approach is;",
        answers: [
          { text: "a flight manoeuvre to be performed only under radar vectoring.", correct: false },
          { text: "a visual manoeuvre to be conducted only in IMC.", correct: false },
          { text: "a contact flight manoeuvre.", correct: false },
          { text: "a visual flight manoeuvre keeping the runway in sight.", correct: true }
        ]
      },
      {
        question: "A Control Zone shall extend laterally to at least;",
        answers: [
          { text: "10 miles from the centre of the aerodrome in the approach direction.", correct: false },
          { text: "20 miles from the centre of the aerodrome in the approach direction.", correct: false },
          { text: "15 miles from the centre of the aerodrome in the approach direction.", correct: false },
          { text: "5 nautical miles from the centre of the aerodrome in the approach direction.", correct: true }
        ]
      },
      {
        question: "A controlled airspace extending upwards from a specified limit above the earth is;",
        answers: [
          { text: "Control zone.", correct: false },
          { text: "Flight Information Region.", correct: false },
          { text: "Advisory airspace.", correct: false },
          { text: "Control area.", correct: true }
        ]
      },
      {
        question: "A controlled airspace extending upwards from the surface of the earth to a specified upper limit is;",
        answers: [
          { text: "Air traffic zone.", correct: false },
          { text: "Advisory airspace.", correct: false },
          { text: "Control area.", correct: false },
          { text: "Control zone.", correct: true }
        ]
      },
      {
        question: "A controlled flight is requested to inform the appropriate ATC unit whenever the average True Air Speed at cruising level varies or is expected to vary from that given in the flight plan by plus or minus;",
        answers: [
          { text: "5%.", correct: true },
          { text: "2%.", correct: false },
          { text: "3%.", correct: false },
          { text: "10%.", correct: false }
        ]
      },
      {
        question: "A double white cross displayed horizontally in the signal area means;",
        answers: [
          { text: "the aerodrome is being used by gliders and that glider flights are being performed.", correct: true },
          { text: "need special precautions while approaching for landing.", correct: false },
          { text: "an area unit for the movement of aircraft.", correct: false },
          { text: "special precautions must be observed due to bad state of the taxiways.", correct: false }
        ]
      },
      {
        question: "A flashing red light from control tower during an approach to land means;",
        answers: [
          { text: "continue circling and wait for further instructions.", correct: false },
          { text: "the airport is unsafe, do not land.", correct: true },
          { text: "the airport is temporarily closed, continue circling.", correct: false },
          { text: "give way to other aircraft in emergency.", correct: false }
        ]
      },
    {
        question: "A lower limit of a Control Area shall be established at a height above the ground level or water of not less than;",
        answers: [
          { text: "500 metres.", correct: false },
          { text: "300 metres.", correct: false },
          { text: "200 metres.", correct: true },
          { text: "150 metres.", correct: false }
        ]
      },
      {
        question: "A minimum radar separation shall be provided until aircraft are established inbound on the ILS localizer course and/or MLS final approach track. This minimum is, when independent parallel approaches are being conducted;",
        answers: [
          { text: "2.0 NM.", correct: false },
          { text: "1.0 NM.", correct: false },
          { text: "5.0 NM.", correct: false },
          { text: "3.0 NM.", correct: true }
        ]
      },
      {
        question: "A minimum vertical separation shall be provided until aircraft are established inbound on the ILS localizer course and/or MLS final approach track. This minimum is, when independent parallel approaches are being conducted;",
        answers: [
          { text: "200 m (660 ft).", correct: false },
          { text: "150 m (500 ft).", correct: false },
          { text: "100 m (330 ft).", correct: false },
          { text: "300 m (1000 ft).", correct: true }
        ]
      },
      {
        question: "A notice containing information concerning flight safety, air navigation, technical, administration or legislative matters and originated at the AIS of a state is called;",
        answers: [
          { text: "Aeronautical Information Circular (AIC).", correct: true },
          { text: "NOTAM.", correct: false },
          { text: "AIRAC.", correct: false },
          { text: "Aeronautical Information Publication (AIP).", correct: false }
        ]
      },
      {
        question: "A notice providing information on Rules of the Air, Air Traffic Services and Air Navigation Procedures and distributed in advance of its effective date is;",
        answers: [
          { text: "A NOTAM RAC.", correct: false },
          { text: "An ATS NOTAM.", correct: false },
          { text: "An Advisory NOTAM.", correct: false },
          { text: "An AIRAC.", correct: true }
        ]
      },
      {
        question: "A radio communications 'Distress' differs from 'Urgency' because in the first case;",
        answers: [
          { text: "there is a serious and imminent danger requiring immediate assistance.", correct: true },
          { text: "the aeroplane will not be able to reach a suitable aerodrome.", correct: false },
          { text: "the aeroplane has suffered damages which impair its fitness to fly.", correct: false },
          { text: "the aeroplane or a passenger's safety require the flight immediately interrupted.", correct: false }
        ]
      },
      {
        question: "A red flare addressed to a flying aircraft means;",
        answers: [
          { text: "Not withstanding any previous instructions, do not land for the time being.", correct: true },
          { text: "Dangerous airfield. Do not land.", correct: false },
          { text: "Come back and land.", correct: false },
          { text: "Give way to another aircraft and hold the circuit.", correct: false }
        ]
      },
      {
        question: "A RNAV distance based separation minimum may be used at the time the level is crossed, provided that each aircraft reports its distance to or from the same on track waypoint. This minimum is;",
        answers: [
          { text: "20 NM.", correct: false },
          { text: "50 NM.", correct: false },
          { text: "80 NM.", correct: true },
          { text: "60 NM.", correct: false }
        ]
      },
      {
        question: "A separation minimum shall be applied between a light or MEDIUM aircraft and a HEAVY aircraft and between a LIGHT aircraft and a MEDIUM aircraft when the heavier aircraft is making a low or missed approach and the lighter aircraft is landing on the same runway in the opposite direction or on a parallel opposite direction runway separated by;",
        answers: [
          { text: "less than 730 m.", correct: false },
          { text: "760 m.", correct: false },
          { text: "less than 760 m.", correct: true },
          { text: "730 m.", correct: false }
        ]
      },
      {
        question: "A separation minimum shall be applied between a light or MEDIUM aircraft and a HEAVY aircraft and between a LIGHT aircraft and a MEDIUM aircraft when the heavier aircraft is making a low or missed approach and the lighter aircraft is utilizing an opposite direction runway for take off, this minimum is;",
        answers: [
          { text: "1 minute.", correct: false },
          { text: "2 minutes.", correct: true },
          { text: "5 minutes.", correct: false },
          { text: "3 minutes.", correct: false }
        ]
      },
    {
        question: "A signalman will ask the pilot to apply parking brakes by the following signals;",
        answers: [
          { text: "Arms down, palms facing inwards, moving arms from extended position inwards.", correct: false },
          { text: "Crossing arms extended above his head.", correct: false },
          { text: "Horizontally moving his hands, fingers extended, palms toward ground.", correct: false },
          { text: "Raise arm and hand, with fingers extended, horizontally in front of body, then clench fist.", correct: true }
        ]
      },
      {
        question: "A so called 'Visual Approach' can be performed;",
        answers: [
          { text: "during IFR flights, if there is permanent sight on the movement area and the underlying ground.", correct: true },
          { text: "during IFR flights, if the cloud base is 1000 ft more than the appropriate DA or MDA for that procedure.", correct: false },
          { text: "as in above, but in addition there should be a visibility of 5.5 km or more.", correct: false },
          { text: "during IFR and VFR flights in VMC.", correct: false }
        ]
      },
      {
        question: "A Special Air Report comprises a number of sections. In section I the pilot fills in;",
        answers: [
          { text: "a position report, including aircraft identification, height, position and time.", correct: true },
          { text: "flight identification and weather noted.", correct: false },
          { text: "weather noted.", correct: false },
          { text: "urgent messages.", correct: false }
        ]
      },
      {
        question: "A State shall provide assistance to an aircraft subjected to an act of unlawful seizure. This assistance includes;",
        answers: [
          { text: "provision of navigation aids, air traffic services, permission to land and refuelling.", correct: false },
          { text: "provision of navigation aids, air traffic services and permission to land.", correct: true },
          { text: "only permission to land.", correct: false },
          { text: "provision of navigation aids, air traffic services, permission to land and catering for passengers.", correct: false }
        ]
      },
      {
        question: "A State shall take adequate measures for the safety of passengers and crew of an aircraft which is subjected to an act of unlawful interference;",
        answers: [
          { text: "until their journey can be continued.", correct: true },
          { text: "if is requested by an individual passenger.", correct: false },
          { text: "and arrange for them to return to their country of origin.", correct: false },
          { text: "during a period of investigation.", correct: false }
        ]
      },
      {
        question: "A strayed aircraft is;",
        answers: [
          { text: "an aircraft which has deviated significantly from its intended track or which reports that it is lost.", correct: true },
          { text: "only that aircraft which reports that it is lost.", correct: false },
          { text: "only that aircraft which has deviated significantly from its intended track.", correct: false },
          { text: "an aircraft in a given area but whose identity has not been established.", correct: false }
        ]
      },
      {
        question: "A VFR flight constitutes essential traffic to other VFR flights when operating in controlled airspace classified as;",
        answers: [
          { text: "B.", correct: true },
          { text: "B, C and D.", correct: false },
          { text: "B and C.", correct: false },
          { text: "B, C, D and E.", correct: false }
        ]
      },
      {
        question: "A VFR flight when flying inside an ATS airspace classified as B has to maintain the following minima of flight visibility and distance from clouds;",
        answers: [
          { text: "8 km below 3050 m (10,000 ft) AMSL, 1500 m horizontal and 300 m vertical from clouds.", correct: false },
          { text: "5 km below 3050 m (10,000 ft) AMSL and clear of clouds.", correct: false },
          { text: "5 km below 3050 m (10,000 ft) AMSL, 1500 m horizontal and 300 m vertical from clouds.", correct: true },
          { text: "5 km visibility, 1500 m horizontal and 300 m vertical from clouds.", correct: false }
        ]
      },
      {
        question: "A VFR flight when flying inside an ATS airspace classified as C has to maintain the following minima of flight visibility and distance from clouds;",
        answers: [
          { text: "8 km at or above 3050 m (10,000 ft) AMSL, 1500 m horizontal and 300 m vertical from clouds.", correct: true },
          { text: "8 km at or above 3050 m (10,000 ft) AMSL, and clear of clouds.", correct: false },
          { text: "5 NM at or above 3050 m (10,000 ft) AMSL, 1500 m horizontal and 300 m vertical from clouds.", correct: false },
          { text: "5km at or above 3050 m (10,000 ft) AMSL,1500 m horizontal and 300 m vertical from clouds.", correct: false }
        ]
      },
      {
        question: "In Pans-Ops, the abbreviation DER stands for;",
        answers: [
          { text: "Distance error in routing.", correct: false },
          { text: "Direct entry route.", correct: false },
          { text: "Displaced end of runway.", correct: false },
          { text: "Departure end of runway.", correct: true }
        ]
      },

    {
        question: "What does the abbreviation OIS mean?",
        answers: [
          { text: "Obstacle in surface.", correct: false },
          { text: "Obstacle identification slope.", correct: false },
          { text: "Obstacle identification surface.", correct: true },
          { text: "Obstruction in surface.", correct: false }
        ]
      },
      {
        question: "After landing, while taxiing towards the apron, the landing gear of your aircraft sinks into a hole. Nobody gets injured, but the aircraft sustains structural damage. This obliges the crew to delay the departure.",
        answers: [
          { text: "This is an incident and the pilot-in-command must report it to the airport authority within the next 48 hours.", correct: false },
          { text: "Since there is no person injured and the flight is terminated, a damage report has to be made out with the services of the aerodrome in charge of the runway and taxiways for the insurance company.", correct: false },
          { text: "This is an irregularity in the operation. The crew must inform the operator of the aerodrome and establish a report.", correct: false },
          { text: "This is an accident and the crew must follow the procedure relevant to this case.", correct: true }
        ]
      },
      {
        question: "Who is responsible for the initiation of an accident investigation?",
        answers: [
          { text: "The aircraft manufacturer.", correct: false },
          { text: "The Operators of the same aircraft type.", correct: false },
          { text: "The Authority of the State in which the accident took place.", correct: true },
          { text: "The State of design and manufacturer.", correct: false }
        ]
      },
      {
        question: "The sole objective of the investigation of an accident or incident shall be the;",
        answers: [
          { text: "prevention of accidents or incidents and establish the liability.", correct: false },
          { text: "prevention of accidents or incidents and to provide legal evidence for subsequent court cases.", correct: false },
          { text: "prevention of accidents or incidents.", correct: true },
          { text: "prevention of accidents or incidents and provide the manufacturer with investigation data for the improvement of the design.", correct: false }
        ]
      },
      {
        question: "According to Annex 7, the registration mark shall be letters, numbers or a combination of letters and numbers and shall be that assigned by;",
        answers: [
          { text: "the International Civil Aviation Organisation.", correct: false },
          { text: "the International Telecommunication Union.", correct: false },
          { text: "the state of registry or common mark registering authority.", correct: true },
          { text: "the state of registry only.", correct: false }
        ]
      },
      {
        question: "According to ICAO Annex 8, a certificate of airworthiness shall be renewed or shall remain valid subject to the;",
        answers: [
          { text: "laws of the State in which it is operated.", correct: false },
          { text: "laws of the State of registry and operation.", correct: false },
          { text: "laws of the State of registry.", correct: true },
          { text: "requirements laid down by ICAO.", correct: false }
        ]
      },
      {
        question: "According to international agreements wind direction shall be adjusted to the local variation and given in degrees magnetic;",
        answers: [
          { text: "when the local variation exceeds 10° East or 10° West.", correct: false },
          { text: "in upper wind forecast for areas north of lat 60° North or 60° South.", correct: false },
          { text: "before landing and take-off.", correct: true },
          { text: "when an aircraft on the request by a meteorological watch office (MWO) or at specified points transmits a PIREP.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, a professional flight crew licence issued by a non JAA State may be rendered valid for use on aircraft registered in a JAA Member State;",
        answers: [
          { text: "at the discretion of the Authority of that Member State concerned for a period not exceeding one year, provided that the basic licence remains valid.", correct: true },
          { text: "at the discretion of the Authority of the Member State concerned for a period not exceeding the period validity of basic licence.", correct: false },
          { text: "at the discretion of the Authority of that Member State concerned for a period not exceeding one year.", correct: false },
          { text: "at the discretion of the Authority of that Member State concerned for a period not exceeding one year, provided that the basic licence remains valid.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, an applicant for a CPL(A) who has satisfactorily followed and completed an integrated flying training course shall have completed as a pilot of aeroplanes having a certificate of airworthiness issued or accepted by a JAA Member State at least;",
        answers: [
          { text: "150 hours of flight time.", correct: true },
          { text: "200 hours of flight time plus 10 hours of instrument ground time.", correct: false },
          { text: "150 hours of flight time plus 10 hours of instrument ground time.", correct: false },
          { text: "200 hours of flight time.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, an applicant for an IR(A) shall hold a PPL(A) including a night qualification or CPL(A) and shall have completed at least 50 hours;",
        answers: [
          { text: "instructional flight time as student-pilot-in-command of aeroplanes.", correct: false },
          { text: "cross country flight time as pilot of aeroplanes or helicopters of which at least 10 hours shall be in aeroplanes.", correct: false },
          { text: "instructional flight time as student-pilot-in-command of aeroplanes or helicopters of which at least 10 hours shall be in aeroplanes.", correct: false },
          { text: "cross country flight time as pilot-in-command in aeroplanes or helicopters of which at least 10 hours shall be in aeroplanes.", correct: true }
        ]
      },
    {
        question: "According to JAR-FCL, an applicant for ATPL (A) shall have completed as a pilot of aeroplane at least 1,500 hours of flight time, including:",
        answers: [
          { text: "500 hours in multi-pilot operations on aeroplanes type certificated in accordance with JAR/FAR 25 or JAR/FAR 23.", correct: true },
          { text: "500 hours in multi-pilot operations on aeroplanes type certificated in accordance with JAR/FAR 25 or JAR/FAR 23, of which up to 150 hours may be as flight engineer.", correct: false },
          { text: "500 hours in multi-pilot operations on aeroplanes type certificated in accordance with JAR/FAR 25 or JAR/FAR 23, as pilot-in-command.", correct: false },
          { text: "500 hours in multi-pilot operations on aeroplanes type certificated in accordance with JAR/FAR 25 or JAR/FAR 23, including 200 hours of night flight as pilot-in-command or as co-pilot.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, an applicant for ATPL(A) shall have demonstrated the ability to perform as pilot-in-command, the procedures and manoeuvres of an aeroplane type certificated for:",
        answers: [
          { text: "Operations by pilots under training.", correct: false },
          { text: "The carriage of passengers at night.", correct: false },
          { text: "A minimum crew of two pilots under IFR.", correct: true },
          { text: "A minimum crew of two pilots plus a flight engineer.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, an examiner’s authorisation is valid for:",
        answers: [
          { text: "The period of validity of the class/type rating.", correct: false },
          { text: "Not more than two years.", correct: false },
          { text: "Not more than three years.", correct: true },
          { text: "The period of validity of the medical certificate.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, an instrument rating is valid for:",
        answers: [
          { text: "Indefinitely.", correct: false },
          { text: "The period of validity of the licence.", correct: false },
          { text: "One year.", correct: true },
          { text: "Two years.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, class rating shall be established for single pilots aeroplanes not requiring a type rating, including:",
        answers: [
          { text: "All self-sustaining gliders.", correct: true },
          { text: "All types of single-pilot, single-engine aeroplanes fitted with a turbojet engine.", correct: false },
          { text: "Any other type of aeroplane if considered necessary.", correct: false },
          { text: "Microlights having fixed wings and moveable aerodynamic control surfaces acting in all three dimensions.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, Class 2 medical certificate for private pilots will be valid for:",
        answers: [
          { text: "24 months until age of 40, 12 months until age of 60 and 6 months thereafter.", correct: false },
          { text: "24 months until age of 40, 12 months thereafter.", correct: false },
          { text: "60 months until age of 40, 24 months until age of 50, 12 months until age of 65 and 6 months thereafter.", correct: true },
          { text: "60 months until age of 30, 24 months until age of 40, 12 months thereafter.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, establishment of separate type rating for aeroplanes will be assessed on the basis of three criteria. One of these three criteria is that the aeroplane has:",
        answers: [
          { text: "Handling characteristics that require additional flying or simulator training.", correct: true },
          { text: "Handling characteristics that require the use of more than one crew member.", correct: false },
          { text: "A certificate of airworthiness issued by the manufacturer.", correct: false },
          { text: "A certificate of airworthiness issued by a non-member state.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, licence holders do not exercise the privileges of their licences, related ratings or authorisations at any time when they are aware of any decrease in their medical fitness which might render them unable to safely exercise those privileges. They shall without undue delay seek the advice of the authority or AME when becoming aware of hospital or clinic admissions for:",
        answers: [
          { text: "More than one week.", correct: false },
          { text: "More than 12 hours.", correct: true },
          { text: "More than 12 days.", correct: false },
          { text: "Any period.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, medical certificates classes are:",
        answers: [
          { text: "1 and 2.", correct: true },
          { text: "Class 1 only.", correct: false },
          { text: "1, 2 and 3.", correct: false },
          { text: "1, 2, 3 and 4.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, single pilot single-engine class ratings are valid for:",
        answers: [
          { text: "One year.", correct: false },
          { text: "Two years up to age 40 years then one year thereafter.", correct: false },
          { text: "Five years after licence issue.", correct: false },
          { text: "Two years.", correct: true }
        ]
      },
      {
        question: "According to JAR-FCL, successful completion of multi-crew co-operation (MCC) training shall be required to;",
        answers: [
          { text: "obtain a professional pilot licence.", correct: false },
          { text: "revalidate any rating or licence.", correct: false },
          { text: "obtain the first class rating on multi-engine aeroplanes.", correct: false },
          { text: "obtain the first type rating on multi-pilot aeroplanes.", correct: true }
        ]
      },
      {
        question: "According to JAR-FCL, the aeroplane instructor categories recognised are;",
        answers: [
          { text: "FE(A)/TRE(A)/CRE(A)/IRE(A) and SFI authorisation.", correct: false },
          { text: "FI(A) and IRI(A).", correct: false },
          { text: "FI(A)/TRI(A)CRE(A)/IRE(A) and SFI authorisation.", correct: false },
          { text: "FI(A)/TRI(A)/CRI(A)/IRI(A) ratings, SFI and MCCI authorisation.", correct: true }
        ]
      },
      {
        question: "According to JAR-FCL, the privileges of a newly qualified Flight Instructor are restricted to carrying out instruction under the supervision of a FI(A), approved for this purpose. The restrictions may be removed from the rating;",
        answers: [
          { text: "on the recommendation of the supervising FI(A) after the holder of the restricted FI(A) rating has completed a competency test.", correct: false },
          { text: "on the recommendation of the supervising FI(A) after the holder of the restricted FI(A) rating has completed at least 100 hours flight instruction and, in addition, has supervised at least 25 student solo flights.", correct: true },
          { text: "on the recommendation of the supervising FI(A) after the holder of the restricted FI(A) rating has supervised at least 100 solo flights.", correct: false },
          { text: "on the recommendation of the supervising FI(A) after the holder of the restricted FI(A) rating has supervised at least 100 solo flights and completed a competency test.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, the privileges of the holder of an unrestricted FI(A) rating are to conduct flight instruction for the issue of a CPL(A);",
        answers: [
          { text: "provided that the FI(A) has completed not less than 15 hours on the relevant type in the preceding 12 months.", correct: false },
          { text: "provided that the FI(A) has completed 200 hours of flight instruction.", correct: false },
          { text: "provided that the FI(A) has completed at least 500 hours of flight time as a pilot of aeroplanes including at least 200 hours of flight instruction.", correct: true },
          { text: "without restriction.", correct: false }
        ]
      },
      {
        question: "According to JAR-FCL, the validity of type ratings and multi-engine class ratings will be one year from the date;",
        answers: [
          { text: "of the last medical certificate.", correct: false },
          { text: "of issue.", correct: true },
          { text: "of the skill test.", correct: false },
          { text: "the application is received by the Authority.", correct: false }
        ]
      },
      {
        question: "According to the 'Aerodrome Reference Code,' the 'Code Letter E' shall identify an aircraft wing span of;",
        answers: [
          { text: "36 m up to but not including 52 m.", correct: false },
          { text: "24 m up to but not including 36 m.", correct: false },
          { text: "52 m up to but not including 65 m.", correct: true },
          { text: "15 m up to but not including 24 m.", correct: false }
        ]
      },
      {
        question: "According with the 'Aerodrome Reference Code' the 'Code number 4' shall identify an aircraft reference field length of;",
        answers: [
          { text: "1200 m.", correct: false },
          { text: "1800 m and over.", correct: true },
          { text: "1500 m.", correct: false },
          { text: "1600 m.", correct: false }
        ]
      },
      {
        question: "Aerodrome Control Service - Priority for landing. If an aircraft enters the traffic circuit without proper authorisation;",
        answers: [
          { text: "it shall only be permitted to land after having received proper authorisation from the aerodrome authority.", correct: false },
          { text: "it shall be permitted to land if its actions indicate that it so desires.", correct: true },
          { text: "it shall not be permitted to land.", correct: false },
          { text: "it shall not be permitted to land unless it becomes evident that the aircraft is in a state of emergency.", correct: false }
        ]
      },
      {
        question: "Aerodrome - General. A defined rectangular area on the ground at the end of the take-off run available, prepared as a suitable area in which an aircraft can be stopped in the case of an abandoned take-off, is called;",
        answers: [
          { text: "Runway end safety area.", correct: false },
          { text: "Stopway.", correct: true },
          { text: "Clearway.", correct: false },
          { text: "Obstacle free zone (OFZ).", correct: false }
        ]
      },
      {
        question: "Aerodrome Identification Beacon. The light shown by an 'Aerodrome Identification Beacon' of a land aerodrome shall be flashing, giving the aerodrome identification by Morse Code. The colour of this light is;",
        answers: [
          { text: "Blue.", correct: false },
          { text: "White.", correct: false },
          { text: "Yellow.", correct: false },
          { text: "Green.", correct: true }
        ]
      },
    {
      question: "Aerodrome traffic is;",
      answers: [
        { text: "All traffic in the aerodrome circuit.", correct: false },
        { text: "All traffic on the manoeuvring area and flying in the vicinity of an aerodrome.", correct: true },
        { text: "All traffic on the movement area and flying in the vicinity of an aerodrome.", correct: false },
        { text: "All traffic on the manoeuvring area.", correct: false }
      ]
    },
    {
      question: "Aerodromes signs should be in the following configuration;",
      answers: [
        { text: "mandatory instruction signs, black background with red inscriptions.", correct: false },
        { text: "mandatory instruction signs, red background with black inscriptions.", correct: false },
        { text: "information signs, yellow or black background with black or yellow inscriptions.", correct: true },
        { text: "information signs, orange background with black inscriptions.", correct: false }
      ]
    },
    {
      question: "Aeronautical Ground Lights on and in the vicinity of aerodromes may be turned off, provided that they can be brought back into operation before the expected arrival of an aircraft in at least;",
      answers: [
        { text: "30 minutes.", correct: false },
        { text: "one hour.", correct: false },
        { text: "5 minutes.", correct: false },
        { text: "15 minutes.", correct: true }
      ]
    },
    {
      question: "Name the acronym signifying the system aimed at advance notification based on common effective dates, of circumstances that necessitate significant changes in operating practices.",
      answers: [
        { text: "NOTAM RAC", correct: false },
        { text: "ATS NOTAM", correct: false },
        { text: "AIRAC", correct: true },
        { text: "Advisory NOTAM", correct: false }
      ]
    },
    {
      question: "SIGMET information can be found in which part of the AIP?",
      answers: [
        { text: "MET", correct: false },
        { text: "GEN", correct: true },
        { text: "AD", correct: false },
        { text: "ENR", correct: false }
      ]
    },
    {
      question: "Which part contains a brief description of areas and/or routes for which meteorological service is provided?",
      answers: [
        { text: "METEO", correct: false },
        { text: "AD", correct: false },
        { text: "GEN", correct: true },
        { text: "ENR", correct: false }
      ]
    },
    {
      question: "Which part of the AIP contains a brief description of the service(s) responsible for search and rescue?",
      answers: [
        { text: "ENR", correct: false },
        { text: "AD", correct: false },
        { text: "SAR", correct: false },
        { text: "GEN", correct: true }
      ]
    },
    {
      question: "Which part of the AIP contains a list with 'Location Indicators'?",
      answers: [
        { text: "ENR", correct: false },
        { text: "AD", correct: false },
        { text: "LOC", correct: false },
        { text: "GEN", correct: true }
      ]
    },
    {
      question: "Which part of the AIP contains information about holding, approach and departure procedures?",
      answers: [
        { text: "ENR", correct: true },
        { text: "MAP", correct: false },
        { text: "AD", correct: false },
        { text: "GEN", correct: false }
      ]
    },
    {
      question: "157?",
      answers: [
        { text: "ENR", correct: true },
        { text: "The AIP does not contain this information", correct: false },
        { text: "GEN", correct: false },
        { text: "AD", correct: false }
      ]
    },
    {
      question: "Which part of the AIP gives detailed information about refuelling facilities and the fuel grades available?",
      answers: [
        { text: "AD", correct: true },
        { text: "FAL", correct: false },
        { text: "GEN", correct: false },
        { text: "ENR", correct: false }
      ]
    },
    {
      question: "Air traffic control service is provided for the purpose of;",
      answers: [
        { text: "preventing collisions between aircraft, between aircraft and obstacles on the manoeuvring area and expediting and maintaining an orderly flow of air traffic.", correct: true },
        { text: "applying separation between aircraft and expediting and maintaining an orderly flow of air traffic.", correct: false },
        { text: "preventing collisions between controlled air traffic and expediting and maintaining an orderly flow of air traffic.", correct: false },
        { text: "avoiding collisions between all aircraft and maintaining an orderly flow of air traffic.", correct: false }
      ]
    },
    {
      question: "Air Traffic Service unit means:",
      answers: [
        { text: "Air Traffic Control units, Flight Information Centres or Air Services reporting offices.", correct: true },
        { text: "Air Traffic Control units and Flight Information Centres.", correct: false },
        { text: "Flight Information Centres and Air Services reporting offices.", correct: false },
        { text: "Air Traffic Control units and Air Services reporting offices.", correct: false }
      ]
    },
    {
      question: "Air traffic services unit clocks and other time recording devices shall be checked as necessary to ensure correct time to within plus or minus;",
      answers: [
        { text: "10 seconds of UTC at all times.", correct: false },
        { text: "15 seconds of UTC at all times.", correct: false },
        { text: "1 minute of UTC at all times.", correct: false },
        { text: "30 seconds of UTC at all times.", correct: true }
      ]
    },
    {
      question: "Aircraft 'A' with an ATC clearance is flying in VMC conditions within a control area. Aircraft 'B' with no ATC clearance is approaching at approximately the same altitude and on a converging course. Which has the right of way?",
      answers: [
        { text: "Aircraft 'A' regardless of the direction which 'B' is approaching.", correct: false },
        { text: "Aircraft 'B' if 'A' is on its left.", correct: true },
        { text: "Aircraft 'B' regardless of the direction 'A' is approaching.", correct: false },
        { text: "Aircraft 'A' if 'B' is on its right.", correct: false }
      ]
    },
    {
      question: "Aircraft flying along the same track may be separated by DME-distances from the same DME and it is confirmed that the aircraft have passed each other. Specify the shortest difference in DME-distance to make it possible for one aircraft to climb or descend;",
      answers: [
        { text: "15 NM.", correct: false },
        { text: "20 NM.", correct: false },
        { text: "12 NM.", correct: false },
        { text: "10 NM.", correct: true }
      ]
    },
    {
      question: "Aircraft wishing to conduct IFR flight within advisory airspace, but not electing to use the air traffic advisory service;",
      answers: [
        { text: "shall nevertheless submit a flight plan but changes made thereto are not necessary to be notified.", correct: false },
        { text: "may file a flight plan under pilot's discretion.", correct: false },
        { text: "need to file a flight plan.", correct: false },
        { text: "shall nevertheless submit a flight plan and notify changes made thereto to the ATS unit providing that service.", correct: true }
      ]
    },
    {
      question: "During a 'Visual Approach' in Controlled Airspace Class C;",
      answers: [
        { text: "ATC will provide separation with other traffic.", correct: true },
        { text: "ATC will provide separation with arriving but not with departing traffic.", correct: false },
        { text: "ATC will provide separation between flights under IFR, pilots are responsible for separation between flights under VFR.", correct: false },
        { text: "Pilots are responsible for separation with arriving and departing aircraft.", correct: false }
      ]
    },
    {
      question: "Alert phase is defined as follows;",
      answers: [
        { text: "An emergency event in which an aircraft and its occupants are considered to be threatened by a danger.", correct: false },
        { text: "A situation where an apprehension exists as to the safety of an aircraft and its occupants.", correct: true },
        { text: "A situation related to an aircraft which reports that the fuel on board is exhausted.", correct: false },
        { text: "A situation related to an aircraft and its occupants are considered to be in a state of emergency.", correct: false }
      ]
    },
    {
      question: "On flights in accordance with IFR, the change of the altimeter setting from QNH to Standard shall be made at the;",
      answers: [
        { text: "transition level.", correct: false },
        { text: "level specified by ATC.", correct: false },
        { text: "transition layer.", correct: false },
        { text: "transition altitude.", correct: true }
      ]
    },

    {
      question: "The Transition Level;",
      answers: [
        { text: "shall be the highest available flight level below the transition altitude that has been established.", correct: false },
        { text: "is published for the aerodrome in the Section ENR of the AIP.", correct: false },
        { text: "shall be the lowest flight level available for use above the transition altitude.", correct: true },
        { text: "is calculated and declared for an approach by the Pilot-in command.", correct: false }
      ]
    },
    {
      question: "The transition altitude of an aerodrome shall be as low as possible but normally not less than;",
      answers: [
        { text: "1500 ft.", correct: false },
        { text: "2500 ft.", correct: false },
        { text: "3000 ft.", correct: true },
        { text: "1000 ft.", correct: false }
      ]
    },
    {
      question: "In the vicinity of an aerodrome of intended landing or used for take-off, the vertical position of aircraft shall be expressed in terms of;",
      answers: [
        { text: "altitude above mean sea level at or below the transition altitude.", correct: true },
        { text: "flight level at or below the transition level.", correct: false },
        { text: "altitude above mean sea level at or above the transition altitude.", correct: false },
        { text: "flight level at or below the transition altitude.", correct: false }
      ]
    },
    {
      question: "Unless instructed otherwise by an air traffic controller, when passing through the transition layer, a pilot shall report the vertical position of the aircraft as;",
      answers: [
        { text: "either altitude or flight level in climb.", correct: false },
        { text: "altitude in climb.", correct: false },
        { text: "flight level in a descent.", correct: false },
        { text: "altitude in a descent.", correct: true }
      ]
    },
    {
      question: "When flying through the transition layer the vertical position of the aircraft should be expressed as;",
      answers: [
        { text: "either altitude or flight level during climb.", correct: false },
        { text: "flight level during descent.", correct: false },
        { text: "altitude during climb.", correct: false },
        { text: "altitude during descent.", correct: true }
      ]
    },
    {
      question: "The transition level;",
      answers: [
        { text: "is calculated by the Pilot-in command.", correct: false },
        { text: "will be passed to aircraft by ATS units.", correct: true },
        { text: "is published and updated in the NOTAM.", correct: false },
        { text: "is published on the approach and landing chart for each aerodrome.", correct: false }
      ]
    },
    {
      question: "The vertical position of an aircraft at or above the transition level with altimeter setting 1013.2 hPa has to be reported;",
      answers: [
        { text: "as Altitude.", correct: false },
        { text: "as Height.", correct: false },
        { text: "according to pilot’s choice.", correct: false },
        { text: "as Flight Level.", correct: true }
      ]
    },
    {
      question: "With altimeter setting of 1013.2 hPa, the vertical position of an aircraft at or above the transition level has to be reported;",
      answers: [
        { text: "as Altitude.", correct: false },
        { text: "as Height.", correct: false },
        { text: "according to pilot’s choice.", correct: false },
        { text: "as Flight Level.", correct: true }
      ]
    },
    {
      question: "An air traffic control unit;",
      answers: [
        { text: "may ask an aircraft to temporarily change its call sign for safety reasons when there is a risk of confusion between two or more similar call signs.", correct: true },
        { text: "may require to change the call sign for safety reasons when there is a risk of confusion between two or more similar call signs providing the aircraft is on a repetitive flight plan.", correct: false },
        { text: "may not ask an aircraft to change its call sign after accepting the flight plan.", correct: false },
        { text: "must not ask an aircraft to change its call sign.", correct: false }
      ]
    },
    {
      question: "An AIRAC is;",
      answers: [
        { text: "a package which consists of the following elements; AIP, supplements to the AIP, NOTAM, AIC, checklists and summaries.", correct: false },
        { text: "a publication issued by or with the authority of a state containing aeronautical information of a lasting character essential to air navigation.", correct: false },
        { text: "a notice distributed by means of telecommunication containing information concerning the establishment, condition or change in any aeronautical facility service, procedure or hazard, the timely knowledge of which is essential to personnel concerned with flight operations.", correct: false },
        { text: "an Acronym for a system aimed at advance notification based on common effective dates, of circumstances necessitating significant changes in operating procedures.", correct: true }
      ]
    },
    {
      question: "An aircraft in climb or descent is considered to have crossed a level when the SSR mode C derived level information indicates that it has passed this level in the required direction by;",
      answers: [
        { text: "more than 300 ft.", correct: true },
        { text: "+/- 300 ft.", correct: false },
        { text: "300 ft.", correct: false },
        { text: "more than 200 ft.", correct: false }
      ]
    },
    {
      question: "An aircraft intercepted by another aircraft shall immediately attempt to establish radio communication with the intercepting aircraft on the following frequencies;",
      answers: [
        { text: "243 MHz – 125.5 MHz.", correct: false },
        { text: "121.5 MHz – 282.8 MHz.", correct: false },
        { text: "121.5 MHz – 125.5 MHz.", correct: false },
        { text: "121.5 MHz – 243 MHz.", correct: true }
      ]
    },
    {
      question: "An aircraft is considered to be maintaining its assigned level as long as the SSR mode C derived level information indicated that it is within;",
      answers: [
        { text: "+/- 500 ft of the assigned level.", correct: false },
        { text: "+/- 200 ft of the assigned level.", correct: false },
        { text: "+/- 300 ft of the assigned level.", correct: true },
        { text: "+/- 250 ft of the assigned level.", correct: false }
      ]
    },
    {
      question: "An aircraft is considered to overtake another if it approaches the other aircraft from the rear on a line forming an angle of less than;",
      answers: [
        { text: "70 degrees with the plane of symmetry of the latter.", correct: true },
        { text: "50 degrees with the plane of symmetry of the latter.", correct: false },
        { text: "80 degrees with the plane of symmetry of the latter.", correct: false },
        { text: "60 degrees with the plane of symmetry of the latter.", correct: false }
      ]
    },
    {
      question: "An aircraft is flying under Instrument Flight Rules in an area where the visibility is unlimited and the sky is clear (free of clouds), when it totally loses radio communications. The procedure to be followed is;",
      answers: [
        { text: "adopt a VFR flight level and continue flight onto destination.", correct: false },
        { text: "descend to En-route Minimum Safe Altitude and join closest airfield open to IFR operations.", correct: false },
        { text: "continue flight onto destination, complying with last received clearances then with filed flight plan.", correct: false },
        { text: "land on the closest appropriate aerodrome, then advise Air Traffic Services of landing.", correct: true }
      ]
    },
    {
      question: "An aircraft is maintaining FL 150 within airspace class C. Another aircraft below at FL 140 is receiving a clearance to descend to FL 70. It is severe turbulence in the area. When is the earliest that a clearance to descend to FL 140 or below can be expected?",
      answers: [
        { text: "When the other aircraft has reported that it has left FL 120.", correct: false },
        { text: "When the other aircraft has reported that it has left FL 140.", correct: false },
        { text: "When the other aircraft has reported that it has reached FL 70.", correct: false },
        { text: "When the other aircraft has reported that it has descended through FL 130.", correct: true }
      ]
    },
    {
      question: "An aircraft making a radar approach should be advised to consider executing a missed approach, if the position or identification of the aircraft is in doubt during any portion of the final approach or if the aircraft is not visible on the radar display for significant interval during the last;",
      answers: [
        { text: "2 NM.", correct: true },
        { text: "3 NM.", correct: false },
        { text: "4 NM.", correct: false },
        { text: "1 NM.", correct: false }
      ]
    },
    {
      question: "An aircraft making a radar approach should be directed to consider executing a missed approach if the aircraft is not visible on the radar display for any significant interval during the;",
      answers: [
        { text: "last 5 NM of the approach.", correct: false },
        { text: "last 3 NM of the approach.", correct: false },
        { text: "last 2 NM of the approach.", correct: true },
        { text: "last 4 NM of the approach.", correct: false }
      ]
    },
    {
      question: "An aircraft making a radar approach should be directed to execute a missed approach if no clearance to land has been received from the non-radar controller by the time the aircraft reaches a distance of;",
      answers: [
        { text: "5 NM from the touchdown.", correct: false },
        { text: "2 NM from the touchdown.", correct: true },
        { text: "4 NM from the touchdown.", correct: false },
        { text: "1.5 NM from the touchdown.", correct: false }
      ]
    },
    {
      question: "An aircraft manoeuvring in an airport’s circuit receives a series of red flashes from the control tower. This signifies that the aircraft must;",
      answers: [
        { text: "give way to another aircraft.", correct: false },
        { text: "return to land and that clearance to land will be communicated in due course.", correct: false },
        { text: "not land for the moment regardless of previous instructions.", correct: false },
        { text: "not land because the airport is not available for landing.", correct: true }
      ]
    },
    {
      question: "An aircraft shall display, if so equipped, an anti-collision light;",
      answers: [
        { text: "while taxiing, but not when it is being towed.", correct: false },
        { text: "outside the daylight-period in flight, but not on the ground when it is being towed.", correct: false },
        { text: "on the ground when the engines are running.", correct: true },
        { text: "outside the daylight-period at engine-start. During the daylight-period this is not applicable.", correct: false }
      ]
    },
    {
      question: "An aircraft which is being subjected to unlawful interference (hijacked) and is forced to divert from the cleared track or cruising level without being able to communicate with ATS shall try to;",
      answers: [
        { text: "declare an emergency.", correct: false },
        { text: "continue at an altitude that differs from the semicircular rule with 1000 feet when above FL 290 and 500 feet when lower than FL 290.", correct: true },
        { text: "fly the emergency triangle.", correct: false },
        { text: "as soon as possible commence emergency descent in order to minimise the difference between cabin pressure and outside pressure.", correct: false }
      ]
    },
    {
      question: "An airline is planning a flight that will require a Technical landing in a neighbouring state. Which freedom of the Air will be exercised?",
      answers: [
        { text: "2nd freedom.", correct: true },
        { text: "3rd freedom.", correct: false },
        { text: "1st freedom.", correct: false },
        { text: "4th freedom.", correct: false }
      ]
    },
    {
      question: "An applicant for a commercial pilot licence-aeroplane shall have completed in aeroplanes not less than;",
      answers: [
        { text: "200 hours of flight time or 150 hours if completed during a course of approved training as a pilot of aeroplanes.", correct: true },
        { text: "150 hours of flight time and 100 hours as pilot in command.", correct: false },
        { text: "200 hours of flight time and 70 hours as pilot in command.", correct: false },
        { text: "200 hours of flight time and 80 hours as pilot in command.", correct: false }
      ]
    },
    {
      question: "An applicant for a commercial pilot licence-aeroplane shall have completed in aeroplanes not less than;",
      answers: [
        { text: "15 hours of cross country flight time as pilot-in-command including a cross country flight not less than 540 km (300 NM).", correct: false },
        { text: "20 hours of cross country flight time as pilot-in-command including a cross country flight not less than 540 km (300 NM).", correct: true },
        { text: "10 hours of cross country flight time as pilot-in-command including a cross country flight not less than 540 km (300 NM).", correct: false },
        { text: "25 hours of cross country flight time as pilot-in-command including a cross country flight not less than 540 km (300 NM).", correct: false }
      ]
    },
    {
      question: "An applicant for a commercial pilot licence-aeroplane shall have completed not less than ...... hours of cross country flight time as pilot in command including a cross country flight totalling not less than ...... km (...... NM), in the course of which full stop landings at two different aerodromes shall be made. The hours and distance referred are;",
      answers: [
        { text: "10 hours and 270 km (150 NM).", correct: false },
        { text: "15 hours and 540 km (300 NM).", correct: false },
        { text: "20 hours and 270 km (150 NM).", correct: false },
        { text: "20 hours and 540 km (300 NM).", correct: true }
      ]
    },
    {
      question: "An applicant for a commercial pilot licence shall have completed in aeroplanes not less than;",
      answers: [
        { text: "20 hours of instrument instruction time of which not more than 5 hours may be instrument ground time.", correct: false },
        { text: "10 hours of instrument instruction time of which not more than 5 hours may be instrument ground time.", correct: true },
        { text: "15 hours of instrument time of which not more than 5 hours as pilot in command.", correct: false },
        { text: "20 hours of instrument instruction time of which not more than 10 hours may be instrument ground time.", correct: false }
      ]
    },
    {
      question: "An applicant for a commercial pilot licence shall hold;",
      answers: [
        { text: "a current class I medical assessment.", correct: true },
        { text: "a current class III medical assessment.", correct: false },
        { text: "a current class II medical assessment.", correct: false },
        { text: "a current class medical assessment as prescribed by the state issuing the licence.", correct: false }
      ]
    },
    {
      question: "An applicant for an Airline Transport Pilot Licence aeroplane shall have completed in aeroplanes not less than ...... hours, either as pilot in command or made up by not less than ...... hours as pilot-in-command and the additional flight time as co-pilot performing, under the supervision of the pilot-in-command the duties and functions of pilot in command provided that the method of supervision employed is acceptable to the licensing authority. The stated above hours are respectively;",
      answers: [
        { text: "200 hours and 75 hours.", correct: false },
        { text: "250 hours and 100 hours.", correct: true },
        { text: "200 hours and 100 hours.", correct: false },
        { text: "150 hours and 75 hours.", correct: false }
      ]
    },
    {
      question: "An applicant for an Airline Transport Pilot Licence shall have completed in aeroplanes not less than;",
      answers: [
        { text: "150 hours of instrument time, of which not more than 75 hours of instrument ground time.", correct: false },
        { text: "75 hours of instrument time, of which not more than 30 hours may be instrument ground time.", correct: true },
        { text: "100 hours of instrument time, of which not more than 30 hours of instrument ground time.", correct: false },
        { text: "75 hours of instrument time, of which not more than 20 hours of instrument ground time.", correct: false }
      ]
    },
    {
      question: "An applicant for an Airline Transport Pilot Licence shall have completed in aeroplanes not less than;",
      answers: [
        { text: "100 hours of night flight only as pilot in command.", correct: false },
        { text: "75 hours of night time only as pilot in command.", correct: false },
        { text: "75 hours of night flight as pilot in command or as co-pilot.", correct: false },
        { text: "100 hours of night flight as pilot in command or as co-pilot.", correct: true }
      ]
    },
    {
      question: "An applicant holding a private or commercial pilot licence aeroplane for the issue of an instrument rating, shall have completed ..... hours of cross-country flight time as pilot-in-command of aircraft in categories acceptable to the licensing Authority, of which not less than ..... hours shall be in aeroplanes. The said hours, are respectively;",
      answers: [
        { text: "40 hours and 15 hours", correct: false },
        { text: "50 hours and 10 hours", correct: true },
        { text: "40 hours and 10 hours", correct: false },
        { text: "50 hours and 15 hours", correct: false }
      ]
    },
    {
      question: "An approaching aircraft may descend below the MSA if;",
      answers: [
        { text: "the aircraft gets radar vectors.", correct: false },
        { text: "the pilot is following the published approach procedure.", correct: false },
        { text: "the pilot has the field and the underlying terrain in sight and will keep it in sight.", correct: false },
        { text: "all mentioned answers are correct.", correct: true }
      ]
    },
    {
      question: "An ATS airspace where IFR and VFR are permitted and receive (FIS)flight information service if requested, is classified as;",
      answers: [
        { text: "Airspace G.", correct: true },
        { text: "Airspace F.", correct: false },
        { text: "Airspace C.", correct: false },
        { text: "Airspace E.", correct: false }
      ]
    },
    {
      question: "An ATS airspace where IFR and VFR are permitted, IFR flights are subject to Air Traffic Control Service and are separated from other IFR flights. All flights receive traffic information as far as is practical, is classified as;",
      answers: [
        { text: "Airspace A.", correct: false },
        { text: "Airspace B.", correct: false },
        { text: "Airspace E.", correct: true },
        { text: "Airspace D.", correct: false }
      ]
    },
    {
      question: "An ATS airspace where IFR and VFR flights are permitted, all flights are subject to air traffic control service and are separated from each other is classified as;",
      answers: [
        { text: "Airspace C.", correct: false },
        { text: "Airspace B.", correct: true },
        { text: "Airspace D.", correct: false },
        { text: "Airspace E.", correct: false }
      ]
    },
    {
      question: "An ATS airspace where IFR and VFR flights are permitted, all flights are subject to air traffic control service and IFR flights are separated from other IFR flights and from VFR flights, VFR flights are separated from IFR flights and receive traffic information in respect of other VFR flights, is classified as;",
      answers: [
        { text: "Airspace E.", correct: false },
        { text: "Airspace C.", correct: true },
        { text: "Airspace D.", correct: false },
        { text: "Airspace B.", correct: false }
      ]
    },
    {
      question: "An ATS airspace where IFR and VFR flights are permitted, all participating IFR flights receive an air traffic advisory service and all flights receive flight information service if requested, is classified as;",
      answers: [
        { text: "Airspace D.", correct: false },
        { text: "Airspace G.", correct: false },
        { text: "Airspace E.", correct: false },
        { text: "Airspace F.", correct: true }
      ]
    },
    {
      question: "An ATS airspace where IFR and VFR flights are permitted and all flights are subject to air traffic control service. IFR flights are separated from other IFR flights and receive traffic information in respect of VFR flights. VFR flights receive traffic information in respect of all other flights, is classified as;",
      answers: [
        { text: "Airspace A.", correct: false },
        { text: "Airspace D.", correct: true },
        { text: "Airspace E.", correct: false },
        { text: "Airspace B.", correct: false }
      ]
    },
    {
      question: "An information issued by a meteorological watch office concerning the occurrence or expected occurrence of specified en-route weather phenomena which may affect the safety of low-level aircraft operations and which was not already included in the forecast issued for low-level flights in the flight information region concerned or subarea thereof is;",
      answers: [
        { text: "a SIGMET information.", correct: false },
        { text: "a NOTAM.", correct: false },
        { text: "an AIRMET information.", correct: true },
        { text: "an En-Route Meteo Report.", correct: false }
      ]
    },

    {
      question: "An integrated aeronautical information package consists of the following elements;",
      answers: [
        { text: "AIP, supplements to AIP, NOTAM and PIB, AIC and checklist summaries.", correct: false },
        { text: "AIP, including amendment service, supplements to AIP, NOTAM, AIC, AIRAC.", correct: false },
        { text: "AIP, including amendment service, supplements to AIP, NOTAM, AIC and checklist summaries.", correct: false },
        { text: "AIP, including amendment service, supplements to AIP, NOTAM and pre-flight information bulletin (PIB), AIC, checklists and summaries.", correct: true }
      ]
    },
    {
      question: "A series of green flashes from aerodrome control directed towards an aircraft on ground means;",
      answers: [
        { text: "Stand by, clearance for take off will be given in short time.", correct: false },
        { text: "Cleared to taxi.", correct: true },
        { text: "Accelerate taxi speed.", correct: false },
        { text: "Slow down taxi speed, but continue.", correct: false }
      ]
    },
    {
      question: "A series of green flashes from aerodrome control directed towards an aircraft in flight means;",
      answers: [
        { text: "Expedite and make a short approach and land as soon as possible.", correct: false },
        { text: "Return for landing, clearance to land will be given in due course.", correct: true },
        { text: "Cleared to land.", correct: false },
        { text: "Continue circling and give way to other aircraft.", correct: false }
      ]
    },
    {
      question: "The pilot of an aircraft, observing a luminous signal requesting help, will indicate to the persons in difficulty that he has received the ground signals by;",
      answers: [
        { text: "fly over the group of people in difficulty as low as possible.", correct: false },
        { text: "switching his landing lights on and off twice or, if not equipped, his navigation lights twice.", correct: true },
        { text: "make at least one complete turn over the group of people in difficulty.", correct: false },
        { text: "transmit, by luminous Morse signal, a series of the letter “R” using his navigational lights.", correct: false }
      ]
    },
    {
      question: "Each Contracting State shall ensure that the appropriate authority arranges for the supporting resources and facilities required by the aviation security services to be available;",
      answers: [
        { text: "on a common basis for all airports within the State.", correct: false },
        { text: "at each airport serving international civil aviation.", correct: true },
        { text: "for administrative staff of each airport within that State.", correct: false },
        { text: "for every airline operating in that State.", correct: false }
      ]
    },
    {
      question: "Aircraft equipped with red anticollision lights may display them;",
      answers: [
        { text: "outside the daylight-period in flight, but not on the ground when being towed.", correct: false },
        { text: "outside the daylight-period at engine start. During the daylight-period this procedure is not applicable.", correct: false },
        { text: "on the ground when the engines are running.", correct: true },
        { text: "while taxiing, but not when being towed.", correct: false }
      ]
    },
    {
      question: "Any person who suffers damage on the surface shall, upon proof only that damage was caused by an aircraft in flight or by any person or thing falling therefore will be entitled to compensation as provided by;",
      answers: [
        { text: "the Rome Convention.", correct: true },
        { text: "the Warsaw Convention.", correct: false },
        { text: "the Chicago Convention.", correct: false },
        { text: "the Montreal Convention.", correct: false }
      ]
    },
    {
      question: "An Expected Approach Time/EAT will be transmitted by the most expeditious means to the aircraft when it is expected that it has to hold;",
      answers: [
        { text: "for 20 minutes or more.", correct: false },
        { text: "for 30 minutes or more.", correct: true },
        { text: "for 10 minutes or more.", correct: false },
        { text: "for 15 minutes or more.", correct: false }
      ]
    },
    {
      question: "In an instrument approach procedure, the segment in which alignment and descent for landing are made is called;",
      answers: [
        { text: "Arrival segment.", correct: false },
        { text: "Initial approach segment.", correct: false },
        { text: "Final approach segment.", correct: true },
        { text: "Intermediate approach segment.", correct: false }
      ]
    },
    {
      question: "The minimum obstacle clearance in the primary area of the initial approach segment for an instrument approach procedure is at least;",
      answers: [
        { text: "150 m (492 ft).", correct: false },
        { text: "300 m (984 ft).", correct: true },
        { text: "450 m (1476 ft).", correct: false },
        { text: "600 m (1968 ft).", correct: false }
      ]
    },
    {
        question: "What is the minimum obstacle clearance requirement at the end of the primary area of the intermediate approach segment in an instrument approach procedure?",
        answers: [
          { text: "150 m (492 ft) reducing to 0 m.", correct: false },
          { text: "450 m (1476 ft) reducing to 150 m (492 ft).", correct: false },
          { text: "300 m (984 ft) reducing to 0 m.", correct: false },
          { text: "300 m (984 ft) reducing to 150 m (492 ft).", correct: true }
        ]
      },
      {
        question: "A circling approach is;",
        answers: [
          { text: "a visual flight manoeuvre that may be carried out as long as visual ground contact can be maintained.", correct: false },
          { text: "a visual flight manoeuvre to be performed when radar vectoring is available.", correct: false },
          { text: "a visual manoeuvre to be conducted only in IMC.", correct: false },
          { text: "a visual flight manoeuvre keeping the runway environment in sight while at MDA/H.", correct: true }
        ]
      },
      {
        question: "It is permissible to eliminate from consideration a particular sector where a prominent obstacle exists in the visual manoeuvring (circling) area outside the final approach and missed approach area. When this option is exercised, the published procedure;",
        answers: [
          { text: "permits circling only in VMC.", correct: false },
          { text: "recommends not to perform circling within the total sector in which the obstacle exists.", correct: false },
          { text: "prohibits circling within the total sector in which the obstacle exists.", correct: true },
          { text: "prohibits the circling approach to the affected runway.", correct: false }
        ]
      },
      {
        question: "The term used to describe the visual phase of flight after completing an instrument approach, to bring an aircraft into position for landing on a runway which is not suitably located for straight-in approach, is;",
        answers: [
          { text: "Visual approach.", correct: false },
          { text: "Visual manoeuvring (circling).", correct: true },
          { text: "Contact approach.", correct: false },
          { text: "Aerodrome traffic pattern.", correct: false }
        ]
      },
      {
        question: "The visual contact with the runway is lost on the down-wind leg, while circling to land following an instrument approach. You have to initiate a go-around;",
        answers: [
          { text: "if you have other visual cues of the aerodrome environment, continue with visual ground contact.", correct: false },
          { text: "turn towards the runway, maintain altitude and request ATC instructions.", correct: false },
          { text: "make a turn of 90 degrees towards the runway and try to regain visual contact.", correct: false },
          { text: "make an initial climbing turn towards the runway and initiate the missed approach.", correct: true }
        ]
      },
      {
        question: "In a precision approach (ILS), generally glide path interception occurs at heights above runway elevation from;",
        answers: [
          { text: "300 m (984 ft) to 900 m (2955 ft).", correct: true },
          { text: "150 m (492 ft) to 900 m (2955 ft).", correct: false },
          { text: "150 m (492 ft) to 300 m (984 ft).", correct: false },
          { text: "300 m (984 ft) to 600 m (1968 ft).", correct: false }
        ]
      },
      {
        question: "In a precision approach (ILS), the final approach segment begins at the;",
        answers: [
          { text: "FAP.", correct: true },
          { text: "FAF.", correct: false },
          { text: "IF.", correct: false },
          { text: "MAP.", correct: false }
        ]
      },
      {
        question: "The ILS obstacle clearance surfaces assume that the pilot does not normally deviate from the centreline more than;",
        answers: [
          { text: "a quarter of a scale deflection after being established on the track.", correct: false },
          { text: "half a scale deflection after being established on the track.", correct: true },
          { text: "one full scale deflection after being established on the track.", correct: false },
          { text: "one and a half of a scale deflection after being established on the track.", correct: false }
        ]
      },
      {
        question: "The primary area of an instrument approach segment is;",
        answers: [
          { text: "the most critical part of the segment where the minimum altitude should be kept very carefully.", correct: false },
          { text: "a defined area symmetrically disposed about the nominal flight track in which the Minimum Obstacle Clearance is provided.", correct: true },
          { text: "the outside part of the segment where the obstacle clearance increases from zero ft to the appropriate minimum.", correct: false },
          { text: "the first part of the segment.", correct: false }
        ]
      },
      {
        question: "For a non-precision or circling approach, the Minimum Descent Height (MDH) cannot be lower than;",
        answers: [
          { text: "400 ft.", correct: false },
          { text: "200 ft.", correct: false },
          { text: "the Obstacle Clearance Height (OCH).", correct: true },
          { text: "350 ft.", correct: false }
        ]
      },
    {
        question: "Minimum Sector Altitudes are established for each aerodrome. The MSA provides an obstacle clearance of at least 300 m (984 ft) within a circle, associated with the homing facility for the approach procedure of that aerodrome. How many NM is the radius of this circle?",
        answers: [
          { text: "10 NM", correct: false },
          { text: "25 NM", correct: true },
          { text: "5 NM", correct: false },
          { text: "20 NM", correct: false }
        ]
      },
      {
        question: "Normally the missed approach procedures are based on a nominal missed approach climb gradient of;",
        answers: [
          { text: "2%.", correct: false },
          { text: "5%.", correct: false },
          { text: "3.3%.", correct: false },
          { text: "2.5%.", correct: true }
        ]
      },
      {
        question: "A complete missed approach procedure consists of the following phases;",
        answers: [
          { text: "Arrival, Intermediate and Final.", correct: false },
          { text: "Initial, Intermediate and Final.", correct: true },
          { text: "Initial and Final.", correct: false },
          { text: "Arrival, Initial, Intermediate and Final.", correct: false }
        ]
      },
      {
        question: "A so-called 'straight-in-approach' is considered to be acceptable for a non-precision approach, if the angle between the final approach track and the runway centreline is;",
        answers: [
          { text: "20° or less.", correct: false },
          { text: "40° or less.", correct: false },
          { text: "10° or less.", correct: false },
          { text: "30° or less.", correct: true }
        ]
      },
      {
        question: "In an instrument approach procedure, the segment in which alignment and descent for landing are made is called;",
        answers: [
          { text: "Final approach segment.", correct: true },
          { text: "Initial approach segment.", correct: false },
          { text: "Arrival segment.", correct: false },
          { text: "Intermediate approach segment.", correct: false }
        ]
      },
      {
        question: "Area Control Centres issue clearances for the purpose of;",
        answers: [
          { text: "achieving separation between IFR flights.", correct: false },
          { text: "providing flight Information Service.", correct: false },
          { text: "providing advisory service.", correct: false },
          { text: "achieving separation between controlled flights.", correct: true }
        ]
      },
      {
        question: "What are the names of all separate segments that can be part of an instrument approach procedure?",
        answers: [
          { text: "Initial, intermediate, final.", correct: false },
          { text: "Descend, holding arrival, initial, intermediate, final, missed approach.", correct: false },
          { text: "Arrival, holding, initial, intermediate, final, missed approach.", correct: false },
          { text: "Arrival, initial, intermediate, final, missed approach.", correct: true }
        ]
      },
      {
        question: "'ASDA' (Acceleration Stop Distance Available) is;",
        answers: [
          { text: "the length of the take-off run available plus the length of the clearway.", correct: false },
          { text: "the length of the runway plus the length of stopway available (if stopway provided).", correct: false },
          { text: "the length of the take-off run available plus the length of stopway (if stopway provided).", correct: true },
          { text: "the length of the take-off run available plus the length of stopway and clearway (if provided).", correct: false }
        ]
      },
      {
        question: "At night an aircraft observes a luminous signal requesting help. To indicate that he has received these ground signals, the pilot must;",
        answers: [
          { text: "switch his landing lights on and off twice or, if he is not so equipped, his navigation lights twice.", correct: true },
          { text: "fly over the group of people in difficulty as low as possible.", correct: false },
          { text: "make at least one complete turn over the group of people in difficulty.", correct: false },
          { text: "transmit, by luminous Morse signal, a series of the letter 'R' using his navigational lights.", correct: false }
        ]
      },
      {
        question: "At the commencement of final approach, if the controller possesses wind information in the form of components, significant changes in the mean surface wind direction and speed shall be transmitted to aircraft. The mean cross-wind component significant change is;",
        answers: [
          { text: "8 KT.", correct: false },
          { text: "5 KT.", correct: true },
          { text: "10 KT.", correct: false },
          { text: "3 KT.", correct: false }
        ]
      },
    {
        question: "At the commencement of final approach, if the controller possesses wind information in the form of components, significant changes in the mean surface wind direction and speed shall be transmitted to aircraft. The mean head-wind component significant change is;",
        answers: [
          { text: "5 KT.", correct: false },
          { text: "8 KT.", correct: false },
          { text: "4 KT.", correct: false },
          { text: "10 KT.", correct: true }
        ]
      },
      {
        question: "At the commencement of final approach, if the controller possesses wind information in the form of components, significant changes in the mean surface wind direction and speed shall be transmitted to aircraft. The mean tail-wind component significant change is;",
        answers: [
          { text: "2 KT.", correct: true },
          { text: "3 KT.", correct: false },
          { text: "4 KT.", correct: false },
          { text: "5 KT.", correct: false }
        ]
      },
      {
        question: "ATIS broadcast;",
        answers: [
          { text: "shall not be transmitted on the voice channel of an ILS.", correct: true },
          { text: "shall not be transmitted on the voice of a VOR.", correct: false },
          { text: "shall be transmitted on the voice channel of an ILS, on a discrete VHF frequency or on the voice channel of a VOR.", correct: false },
          { text: "Shall only be transmitted on a discrete VHF frequency.", correct: false }
        ]
      },
      {
        question: "ATIS broadcast messages containing departure and arrival information should include cloud cover, when the clouds are;",
        answers: [
          { text: "cumulonimbus.", correct: false },
          { text: "below 1500 m (5000 ft) or below the highest minimum sector altitude, whichever is the greater.", correct: true },
          { text: "below 900 m (3000 ft) or below the highest minimum sector altitude, whichever is the greater.", correct: false },
          { text: "below 2000 m (600 ft) or below the highest minimum sector altitude, whichever is the greater.", correct: false }
        ]
      },
      {
        question: "ATS airspace’s where IFR and VFR flights are permitted, all flights are subject to air traffic control service and are separated from each other is classified as;",
        answers: [
          { text: "Class A.", correct: false },
          { text: "Class B.", correct: true },
          { text: "Class E.", correct: false },
          { text: "Class D.", correct: false }
        ]
      },
      {
        question: "The final authority as to the disposition (düzenleme) of the aircraft has the;",
        answers: [
          { text: "ATC controller whenever the aircraft is flying in controlled airspace.", correct: false },
          { text: "Pilot-in-command.", correct: true },
          { text: "Aircraft owner.", correct: false },
          { text: "Operator.", correct: false }
        ]
      },
      {
        question: "The highest priority for landing has;",
        answers: [
          { text: "an aircraft that is compelled to land (Emergency landing).", correct: true },
          { text: "an aircraft on a diplomatic flight (Head of state).", correct: false },
          { text: "an Air Ambulance carrying a very sick person needing immediate medical attention.", correct: false },
          { text: "a military aircraft.", correct: false }
        ]
      },
      {
        question: "'Cabotage' refers to;",
        answers: [
          { text: "domestic air services.", correct: true },
          { text: "a flight above territorial waters.", correct: false },
          { text: "a national air carrier.", correct: false },
          { text: "crop spraying.", correct: false }
        ]
      },
      {
        question: "Change from IFR to VFR will always take place;",
        answers: [
          { text: "on the initiative of the aircraft commander.", correct: true },
          { text: "as instructed by an air traffic control unit.", correct: false },
          { text: "at the clearance limit, irrespective of the weather conditions.", correct: false },
          { text: "when the aircraft is leaving controlled airspace during VMC.", correct: false }
        ]
      },
      {
        question: "Changing of flight rules from IFR to VFR is possible;",
        answers: [
          { text: "only when leaving controlled airspace.", correct: false },
          { text: "if instructed by ATC so long as VMC is forecasted during the next 60 minutes.", correct: false },
          { text: "if the commander so requests.", correct: true },
          { text: "if instructed by ATC so long as VMC is forecasted during the next 30 minutes.", correct: false }
        ]
      },
    {
        question: "Each wing bar of T-VASIS has;",
        answers: [
          { text: "4 lights.", correct: true },
          { text: "3 lights.", correct: false },
          { text: "5 lights.", correct: false },
          { text: "2 lights.", correct: false }
        ]
      },
      {
        question: "Contracting States have the obligation to inform ICAO about;",
        answers: [
          { text: "changes in the national regulations.", correct: false },
          { text: "new licenses and ratings for flight crew and ground personnel and any suspended validity of such licenses.", correct: false },
          { text: "differences or non-compliance with standards in any of the Annexes to the convention.", correct: true },
          { text: "the pricing policy and agreements on passenger tickets and freight in international air transport.", correct: false }
        ]
      },
      {
        question: "One of the conditions to descend below the MDA on a circling approach is;",
        answers: [
          { text: "the landing runway and an alternative landing possibility (runway) are in sight.", correct: false },
          { text: "the Ceiling is 1500 ft or higher.", correct: false },
          { text: "the horizontal Visibility is at least 5 NM and the Ceiling is 1500 ft or higher.", correct: false },
          { text: "the required visual references have been established and can be maintained.", correct: true }
        ]
      },
      {
        question: "Above 3050 m (10,000 ft) AMSL, the VMC minima for VFR flights in all classes of airspace are;",
        answers: [
          { text: "Visibility: 8 km, Distance from clouds: 1500 m horizontal, 1000 ft vertical.", correct: true },
          { text: "No minima defined, VFR flights are not permitted.", correct: false },
          { text: "Visibility: 8 km, clear of clouds.", correct: false },
          { text: "Visibility: 5 km, Distance from clouds: 1500 m horizontal, 1000 ft vertical.", correct: false }
        ]
      },
      {
        question: "An aircraft flying under IFR, maintaining FL 150 has requested clearance for descent. Another aircraft flying below, maintaining FL 140 receives the clearance; 'Descend to FL 70, report passing FL 100'. The earliest moment the pilot of the aircraft at the higher level can expect to receive a clearance to descend to FL 140 or below is, when the pilot of the aircraft at the lower level has reported;",
        answers: [
          { text: "that he has passed through FL 100.", correct: false },
          { text: "that he has descended through FL 130.", correct: false },
          { text: "that he has reached FL 70.", correct: false },
          { text: "that he has left FL 140.", correct: true }
        ]
      },
      {
        question: "A pilot may expect to receive the clearance to land or any alternative clearance before the aircraft reaches a distance of;",
        answers: [
          { text: "3 NM from touchdown.", correct: false },
          { text: "2 NM from touchdown.", correct: true },
          { text: "5 NM from touchdown.", correct: false },
          { text: "4 NM from touchdown.", correct: false }
        ]
      },
      {
        question: "Clearance to land or any alternative clearance received from the non-radar controller should normally be passed to the aircraft before it reaches a distance of;",
        answers: [
          { text: "3 NM from touchdown.", correct: false },
          { text: "5 NM from touchdown.", correct: false },
          { text: "4 NM from touchdown.", correct: false },
          { text: "2 NM from touchdown.", correct: true }
        ]
      },
      {
        question: "Clearances will be issued by an ATC unit for the purpose of;",
        answers: [
          { text: "achieving separation between controlled flights.", correct: true },
          { text: "providing flight Information Service.", correct: false },
          { text: "providing alerting services.", correct: false },
          { text: "providing advisory services.", correct: false }
        ]
      },
      {
        question: "'Clearway' is defined rectangular area established to;",
        answers: [
          { text: "permit the aircraft to stop if it fails the take-off.", correct: false },
          { text: "protect aircraft during take-off or landing operations.", correct: false },
          { text: "reduce the risk of damage to aircraft running off a runway.", correct: false },
          { text: "permit aircraft to make a portion of its initial climb to a specific height.", correct: true }
        ]
      },
      {
        question: "'Code letter D' shall be chosen to identify a taxiway used by aircraft having an outer main gear wheel span of less than 9 m. The taxiway width shall be;",
        answers: [
          { text: "23 m.", correct: false },
          { text: "18 m.", correct: true },
          { text: "25 m.", correct: false },
          { text: "15 m.", correct: false }
        ]
      },
    {
        question: "After experiencing a communication failure on a flight in accordance with IFR, the aircraft shall comply with the communication failure procedures. When flying in VMC, the aircraft shall;",
        answers: [
          { text: "continue on to destination, complying with last received and confirmed clearances or with filed flight plan.", correct: false },
          { text: "continue to fly in VMC, land at the nearest suitable aerodrome and report its arrival by most expeditious means to the appropriate ATS unit.", correct: true },
          { text: "adopt a VFR flight level and continue according to VFR to the flight plan destination.", correct: false },
          { text: "descend to Minimum Safe Altitude/Level, continue to the nearest aerodrome with instrument approach procedure.", correct: false }
        ]
      },
      {
        question: "You are on a flight in accordance with IFR in IMC, exactly on the current flight plan route. At 18:36 UTC you receive and acknowledge the following instruction from the radar controller; 'Turn immediately, fly heading 050° until further advised'. At 18:37 UTC you discover a communication failure. Two-way radio communication cannot be established again.",
        answers: [
          { text: "You continue on Heading 050 for 15 minutes.", correct: false },
          { text: "You continue on Heading 050.", correct: false },
          { text: "You continue on Heading 050 for 30 minutes.", correct: false },
          { text: "You have to return to your current flight plan route.", correct: true }
        ]
      },
      {
        question: "Concerning to RNP (Required Navigation Performance) types, the indication RNP 4 represents a navigation accuracy of;",
        answers: [
          { text: "plus or minus 4 NM on a 90 per cent containment basis.", correct: false },
          { text: "plus or minus 4 miles on a 90 per cent containment basis.", correct: false },
          { text: "plus or minus 4 NM on a 98 per cent containment basis.", correct: false },
          { text: "plus or minus 4 NM on a 95 per cent containment basis.", correct: true }
        ]
      },
      {
        question: "Control Area (CTA) is defined as follows;",
        answers: [
          { text: "A controlled airspace extending upwards from a specified limit above the earth.", correct: true },
          { text: "A controlled airspace extending upwards from a height of 1000 feet above the earth.", correct: false },
          { text: "A controlled airspace extending upwards from the surface of the earth to a specified limit.", correct: false },
          { text: "A controlled airspace extending upwards from a height of 900 feet above the earth.", correct: false }
        ]
      },
      {
        question: "Cruising level IFR during cruise within controlled airspace shall be given as flight level (FL);",
        answers: [
          { text: "above the transition altitude when applicable.", correct: true },
          { text: "if the obstacle clearance is more than 2000 feet.", correct: false },
          { text: "only in airspace class A.", correct: false },
          { text: "when QNH is higher than the standard pressure 1013 hPa.", correct: false }
        ]
      },
      {
        question: "The movement area of an airfield, the adjacent terrain and buildings or portions thereof with controlled access are called;",
        answers: [
          { text: "Security program.", correct: false },
          { text: "Manoeuvring area.", correct: false },
          { text: "Airside.", correct: true },
          { text: "Terminal.", correct: false }
        ]
      },
      {
        question: "A manoeuvre in which a turn is made away from a designated track followed by a turn in the opposite direction to permit the aircraft to intercept and proceed along the reciprocal of the designated track.",
        answers: [
          { text: "Race track", correct: false },
          { text: "Procedure turn", correct: true },
          { text: "Reversal track", correct: false },
          { text: "Base turn", correct: false }
        ]
      },
      {
        question: "A defined rectangular area, selected or prepared as a suitable area over which an aeroplane may make a portion of its initial climb to a specific height is called;",
        answers: [
          { text: "Runway end safety area (RESA).", correct: false },
          { text: "Stopway.", correct: false },
          { text: "Take-off run available (TORA).", correct: false },
          { text: "Clearway.", correct: true }
        ]
      },
      {
        question: "Non-precision approach runways and precision approach runways CAT I, II and III are defined as;",
        answers: [
          { text: "Non-instrument runways.", correct: false },
          { text: "Instrument runways.", correct: true },
          { text: "Movement area.", correct: false },
          { text: "Parallel runways.", correct: false }
        ]
      },
      {
        question: "A turn executed by the aircraft during the initial approach between the end of the outbound track and the beginning of the intermediate or final approach track. The tracks are not reciprocal.",
        answers: [
          { text: "Base turn", correct: true },
          { text: "Procedure turn", correct: false },
          { text: "Reversal procedure", correct: false },
          { text: "Race track", correct: false }
        ]
      },
    {
        question: "A so-called 'Visual Approach' can be performed;",
        answers: [
          { text: "during IFR and VFR approaches in VMC.", correct: false },
          { text: "during IFR approaches, if the cloud base is 1000 ft higher than the appropriate DA or MDA for that procedure, and the visibility is at least 5.5 km.", correct: false },
          { text: "during IFR approaches if the cloud base is 1000 ft higher than the appropriate DA or MDA for that procedure.", correct: false },
          { text: "when either part or all of an instrument approach procedure is not completed and the approach is executed in visual reference to terrain.", correct: true }
        ]
      },
      {
        question: "The main factor/s that dictate/s in general the design of an instrument departure procedure is/are;",
        answers: [
          { text: "ATC availability and requirements.", correct: false },
          { text: "airspace restrictions applicable and in force.", correct: false },
          { text: "availability of navigation aids.", correct: false },
          { text: "the terrain surrounding the aerodrome.", correct: true }
        ]
      },
      {
        question: "Dependent parallel approaches may be conducted to parallel runways provided that the missed approach track for one approach diverges by;",
        answers: [
          { text: "at least 15° (degrees) from the missed approach track of the adjacent approach.", correct: false },
          { text: "at least 30° (degrees) from the missed approach track of the adjacent approach.", correct: true },
          { text: "at least 45° (degrees) from the missed approach track of the adjacent approach.", correct: false },
          { text: "at least 25° (degrees) from the missed approach track of the adjacent approach.", correct: false }
        ]
      },
      {
        question: "Pilots of controlled flights are requested to inform the appropriate ATS whenever the average TAS at cruising level between reporting points varies or is expected to vary from the TAS given in the flight plan by;",
        answers: [
          { text: "2%.", correct: false },
          { text: "3%.", correct: false },
          { text: "4%.", correct: false },
          { text: "5%.", correct: true }
        ]
      },
      {
        question: "During an arrival procedure under an IFR flight plan in VMC conditions, traffic avoidance is the responsibility of;",
        answers: [
          { text: "the approach controller.", correct: false },
          { text: "the radar controller.", correct: false },
          { text: "the pilot in command.", correct: true },
          { text: "the airport controller.", correct: false }
        ]
      },
      {
        question: "During an IFR flight in VMC in controlled airspace you experience a two-way radio communication failure. You will;",
        answers: [
          { text: "land at the nearest suitable aerodrome and inform ATC.", correct: false },
          { text: "descend to the flight level submitted for that portion of flight.", correct: false },
          { text: "land at the nearest suitable aerodrome maintaining VMC and inform ATC.", correct: true },
          { text: "select A7600 and continue according current flight plan to destination.", correct: false }
        ]
      },
      {
        question: "During radar control, a 'radar-controller' shall issue a missed-approach instruction, in case the 'tower-controller' has not issued a 'landing-clearance' at the moment the aircraft is;",
        answers: [
          { text: "2 NM from touch-down.", correct: true },
          { text: "4 NM from touch-down.", correct: false },
          { text: "3 NM from touch-down.", correct: false },
          { text: "1 NM from touch-down.", correct: false }
        ]
      },
      {
        question: "Each contracting state shall provide an Aeronautical Information Service (AIS) in its territory and for areas in which the state is responsible for the Air Traffic Services outside its territory, and this shall include the preparation and origination of;",
        answers: [
          { text: "AIP, NOTAMs, Circular and AIRAC.", correct: false },
          { text: "Integrated Aeronautical Information Package.", correct: true },
          { text: "Only NOTAMs and Circulars.", correct: false },
          { text: "Only AIP and NOTAMs.", correct: false }
        ]
      },
      {
        question: "Each member state should designate an appropriate authority with its administration to be responsible for the development, implementation, and maintenance of a national aviation security programme. This programme should apply;",
        answers: [
          { text: "to all international civil air transport including aircraft engaged solely in the carriage of cargo and yet to domestic flights at the discretion of each member state.", correct: true },
          { text: "only to passengers and aircrew in international civil transport flights.", correct: false },
          { text: "only to passengers and aircrew in international civil transport flights and domestic flights.", correct: false },
          { text: "only to all international civil transport including aircraft engaged solely in the carriage of cargo.", correct: false }
        ]
      },
      {
        question: "Each State of ICAO Annex 17 shall ensure the establishment of a security programme;",
        answers: [
          { text: "at each airport.", correct: true },
          { text: "only for administrative staff of airport.", correct: false },
          { text: "for every airline operating in the State.", correct: false },
          { text: "that is common for all airports within State.", correct: false }
        ]
      },

    {
        question: "Except in some special cases the establishment of change-over points should be limited to route segments of;",
        answers: [
          { text: "100 NM or more.", correct: false },
          { text: "60 NM or more.", correct: true },
          { text: "50 NM or more.", correct: false },
          { text: "75 NM or more.", correct: false }
        ]
      },
      {
        question: "Except otherwise established by the appropriate ATS authority a Surveillance Radar Approach (SRA) shall be terminated at a distance from the touchdown of;",
        answers: [
          { text: "2 NM.", correct: true },
          { text: "3 NM.", correct: false },
          { text: "5 NM.", correct: false },
          { text: "4 NM.", correct: false }
        ]
      },
      {
        question: "Except when a clearance is obtained from an ATC unit, a VFR flight cannot enter or leave a control zone when ceiling is less than;",
        answers: [
          { text: "1000 feet or visibility is less than 8 km.", correct: false },
          { text: "1000 feet or visibility is less than 5 km.", correct: false },
          { text: "1500 feet or visibility is less than 5 km.", correct: true },
          { text: "2000 feet or visibility is less than 5 km.", correct: false }
        ]
      },
      {
        question: "Except when prescribed in procedures or made possible by agreements, aircraft under radar control shall not be vectored closer to the boundary of controlled airspace than;",
        answers: [
          { text: "2.5 NM.", correct: true },
          { text: "3 NM.", correct: false },
          { text: "5 NM.", correct: false },
          { text: "1.5 NM.", correct: false }
        ]
      },
      {
        question: "A pilot receives an EAT as soon as practicable, when an expected approach delay is;",
        answers: [
          { text: "20 minutes.", correct: false },
          { text: "10 minutes or more.", correct: true },
          { text: "10 minutes.", correct: false },
          { text: "15 minutes or more.", correct: false }
        ]
      },
      {
        question: "During a precision approach (ILS), glide path interception occurs normally at heights above runway elevation between;",
        answers: [
          { text: "300 m (984 ft) to 900 m (2955 ft).", correct: true },
          { text: "300 m (984 ft) to 600 m (1968 ft).", correct: false },
          { text: "150 m (492 ft) to 300 m (984 ft).", correct: false },
          { text: "150 m (492 ft) to 900 m (2955 ft).", correct: false }
        ]
      },
      {
        question: "Flight Information Region (FIR) is an airspace within which the following services are provided;",
        answers: [
          { text: "Flight Information Service, Alerting Service and Advisory Service.", correct: false },
          { text: "Flight Information Service only.", correct: false },
          { text: "Flight Information Service and Alerting Service.", correct: true },
          { text: "Flight Information Service and Advisory Service.", correct: false }
        ]
      },
      {
        question: "Flight information service provided to flights shall include the provision of information concerning collision hazards to aircraft operating in airspace classes;",
        answers: [
          { text: "A to E (inclusive).", correct: false },
          { text: "F and G.", correct: false },
          { text: "C to G (inclusive).", correct: true },
          { text: "A to G (inclusive).", correct: false }
        ]
      },
      {
        question: "Flight Information Service shall be provided to aircraft in order to avoid collision hazards when operating in airspace classes;",
        answers: [
          { text: "F only.", correct: false },
          { text: "A, B, C, D, E, F and G.", correct: false },
          { text: "F and G only.", correct: false },
          { text: "C, D, E, F and G.", correct: true }
        ]
      },
      {
        question: "For flights in accordance with IFR within advisory airspace a flight plan;",
        answers: [
          { text: "shall be submitted. There is no obligation to report changes.", correct: false },
          { text: "shall be submitted. Changes to the flight plan have to be reported.", correct: true },
          { text: "may be submitted at the pilot's discretion. In case a flight plan is submitted all changes shall be reported as soon as practicable to the appropriate ATS unit.", correct: false },
          { text: "does not have to be submitted.", correct: false }
        ]
      },
    {
        question: "In the event that a controlled flight inadvertently deviates from its track given in the current flight plan, action should be taken in order to;",
        answers: [
          { text: "maintain VMC, wait for instructions from the appropriate ATS unit.", correct: false },
          { text: "adjust the heading of aircraft to regain track as soon as practicable.", correct: true },
          { text: "notify the appropriate ATS unit immediately notifying the new track and to comply with instructions from ATS.", correct: false },
          { text: "climb or descend by 500 ft, inform the appropriate ATS unit.", correct: false }
        ]
      },
      {
        question: "For an IFR flight to an airport equipped with navaids, the estimated time of arrival is the estimated time at which the aircraft;",
        answers: [
          { text: "will arrive overhead the initial approach fix.", correct: true },
          { text: "will leave the initial approach fix to start the final approach.", correct: false },
          { text: "will land.", correct: false },
          { text: "will stop on the parking area.", correct: false }
        ]
      },
      {
        question: "For commercial pilot licence aeroplane the applicant shall have completed in aeroplanes not less than if the privileges of the licence are to be exercised at night;",
        answers: [
          { text: "5 hours of night flight time including 5 take-offs and 5 landings either as pilot in command or as co-pilot.", correct: false },
          { text: "5 hours of night flight time including 5 take-offs and 5 landings as pilot in command.", correct: true },
          { text: "5 hours of night flight time including 3 take-offs and 3 landings as pilot in command.", correct: false },
          { text: "5 hours of night flight time including 3 take-offs and 5 landings as pilot in command.", correct: false }
        ]
      },
      {
        question: "For controlled traffic that shall be separated in the vicinity of an airport, separation minima may be reduced;",
        answers: [
          { text: "only if the air traffic controller has the involved aircraft in sight.", correct: false },
          { text: "if the commander of the involved aircraft so requests.", correct: false },
          { text: "at the discretion of the air traffic controller.", correct: false },
          { text: "when the commander in the following aircraft has the preceding aircraft in sight and is able to maintain own separation.", correct: true }
        ]
      },
      {
        question: "For the transport of potentially disruptive passengers some supplementary safeguards are to be observed such as;",
        answers: [
          { text: "the boarding will be at the pilot in command discretion.", correct: false },
          { text: "boarding prior to all passengers.", correct: true },
          { text: "boarding after to all other passengers.", correct: false },
          { text: "the boarding has to be done at the state discretion.", correct: false }
        ]
      },
      {
        question: "If an ATC clearance is not suitable to the pilot-in-command of an aircraft;",
        answers: [
          { text: "the PIC may request an amended clearance from the ATC. Amended clearances will only be given when VMC prevails.", correct: false },
          { text: "the PIC has to accept the ATC clearance. The clearance is based on the flight plan filed with ATC.", correct: false },
          { text: "the PIC may request and, if practicable, obtain an amended clearance.", correct: true },
          { text: "the PIC may propose another clearance. ATC has to amend the clearance in accordance with the pilots request.", correct: false }
        ]
      },
      {
        question: "A change from instrument flight rules (IFR) to visual flight rules (VFR) is only acceptable, when VFR is permitted in that air space and when;",
        answers: [
          { text: "the PIC has requested and obtained an ATC CLR for the change and has filed a special VFR flight plan.", correct: false },
          { text: "the position of the change has been noted on the ATC flight plan. The cancellation of the IFR flight will then be made automatically by ATC.", correct: false },
          { text: "the change is initiated by the PIC with a message containing the specific expression 'cancelling my IFR flight'.", correct: true },
          { text: "ATC invites the PIC to change from IFR to VFR.", correct: false }
        ]
      },
      {
        question: "In the event of a delay for an uncontrolled flight for which a flight plan has been submitted, the flight plan should be amended or a new flight plan submitted and the old one cancelled, when the delay is exceeding the original;",
        answers: [
          { text: "estimated departure time by 30 minutes.", correct: false },
          { text: "estimated off-block time by 30 minutes.", correct: false },
          { text: "estimated off-block time by 60 minutes.", correct: true },
          { text: "estimated departure time by 60 minutes.", correct: false }
        ]
      },
      {
        question: "In the event of a delay of a controlled flight, the submitted flight plan should be amended or cancelled and a new flight plan submitted when the delay is in excess of;",
        answers: [
          { text: "30 minutes of the estimated time off blocks.", correct: true },
          { text: "30 minutes of the estimated time of departure.", correct: false },
          { text: "60 minutes of the estimated time off blocks.", correct: false },
          { text: "60 minutes of the estimated time of departure.", correct: false }
        ]
      },
      {
        question: "Who is in general responsible for an ATC clearance to be safe in respect to terrain clearance?",
        answers: [
          { text: "The aircraft operator.", correct: false },
          { text: "The pilot-in-command.", correct: true },
          { text: "The ATS reporting office accepting the flight plan.", correct: false },
          { text: "The ATC.", correct: false }
        ]
      },
    {
        question: "A complete position report transmitted by radiotelephony shall contain the following elements of information in the order listed;",
        answers: [
          { text: "1) Aircraft identification, 2) position, 3) time, 4) flight level or altitude, 5) next position and time over, 6) ensuing significant point.", correct: true },
          { text: "1) Aircraft identification, 2) position, 3) flight level or altitude, 4) time, 5) next position and time over, 6) ensuing significant point.", correct: false },
          { text: "1) Aircraft identification, 2) position, 3) time, 4) true air speed, 5) flight level or altitude, 6) next position and time over.", correct: false },
          { text: "1) Aircraft identification, 2) position, 3) time, 4) flight level or altitude, 5) next position, 6) time over.", correct: false }
        ]
      },
      {
        question: "When does Air Traffic Control Services have the responsibility to prevent collisions with terrain?",
        answers: [
          { text: "ATS never prevent collisions with terrain.", correct: false },
          { text: "When a flight in accordance with IFR is vectored by radar.", correct: true },
          { text: "ATS only provides prevention when an aircraft is flying IFR in IMC.", correct: false },
          { text: "Always when ATS are provided.", correct: false }
        ]
      },
      {
        question: "Within uncontrolled airspace, the first usable level in IFR must provide a 500 ft margin above the following two levels;",
        answers: [
          { text: "3000 ft AMSL or 1000 ft AGL.", correct: true },
          { text: "FL30 or 100 ft AGL.", correct: false },
          { text: "FL30 or 1500 ft AGL.", correct: false },
          { text: "3000 ft AMSL or 1500 ft AGL.", correct: false }
        ]
      },
      {
        question: "High intensity obstacle lights should be;",
        answers: [
          { text: "fixed red.", correct: false },
          { text: "flashing white.", correct: true },
          { text: "fixed orange.", correct: false },
          { text: "flashing red.", correct: false }
        ]
      },
      {
        question: "If for any reasons a pilot is unable to conform to the procedures for normal conditions laid down for any particular holding pattern, he should;",
        answers: [
          { text: "follow the radio communication failure procedure.", correct: false },
          { text: "advise ATC as early as possible.", correct: true },
          { text: "execute a non-standard holding pattern in accordance with the performance of his aeroplane.", correct: false },
          { text: "remain within the protected area, but may deviate from the prescribed holding.", correct: false }
        ]
      },
      {
        question: "How far beyond the boundary of the holding area extends the buffer area?",
        answers: [
          { text: "5 NM.", correct: true },
          { text: "3 NM.", correct: false },
          { text: "5 km.", correct: false },
          { text: "3 km.", correct: false }
        ]
      },
      {
        question: "Related to the three entry sectors in a holding pattern, there is a zone of flexibility on either side of the sectors boundaries of;",
        answers: [
          { text: "15°.", correct: false },
          { text: "5°.", correct: true },
          { text: "10°.", correct: false },
          { text: "20°.", correct: false }
        ]
      },
      {
        question: "You have received instructions to hold over a radio fix. The published procedure is; All turns to the right, 1 minute outbound, inbound Magnetic Track 052°. You are approaching the fix on Magnetic Track 232°. Select the appropriate entry procedure;",
        answers: [
          { text: "parallel or direct.", correct: false },
          { text: "either offset or parallel.", correct: true },
          { text: "offset only.", correct: false },
          { text: "direct only.", correct: false }
        ]
      },
      {
        question: "Above 14,000 ft in still air, the outbound time on a 30° offset track is limited to;",
        answers: [
          { text: "2 minutes.", correct: false },
          { text: "1 minute.", correct: false },
          { text: "1 minute 30 seconds.", correct: true },
          { text: "3 minutes.", correct: false }
        ]
      },
      {
        question: "The outbound time in a holding pattern above 14,000 ft in still air conditions is;",
        answers: [
          { text: "2 minutes 30 seconds.", correct: false },
          { text: "2 minutes.", correct: false },
          { text: "1 minute.", correct: false },
          { text: "1 minute 30 seconds.", correct: true }
        ]
      },
    {
        question: "The outbound time in a holding pattern at 14,000 ft or below in still air conditions is;",
        answers: [
          { text: "1 minute.", correct: true },
          { text: "30 seconds.", correct: false },
          { text: "2 minutes.", correct: false },
          { text: "1.5 minutes.", correct: false }
        ]
      },
      {
        question: "A minimum radar separation shall be provided until aircraft are established inbound on the ILS localizer course and/or MLS final approach track. This minimum is, when independent parallel approaches are being conducted;",
        answers: [
          { text: "1.0 NM.", correct: false },
          { text: "2.0 NM.", correct: false },
          { text: "3.0 NM.", correct: true },
          { text: "5.0 NM.", correct: false }
        ]
      },
      {
        question: "Such approaches may be conducted to parallel runways provided that the missed approach track for one approach diverges from the missed approach track of the adjacent approach by at least;",
        answers: [
          { text: "30º (degrees).", correct: true },
          { text: "25º (degrees).", correct: false },
          { text: "45º (degrees).", correct: false },
          { text: "20º (degrees).", correct: false }
        ]
      },
      {
        question: "How many red lights must a pilot see, whose aircraft, in final approach, is following a normal glide path defined by a PAPI?",
        answers: [
          { text: "None.", correct: false },
          { text: "3.", correct: false },
          { text: "1.", correct: false },
          { text: "2.", correct: true }
        ]
      },
      {
        question: "When a Contracting State renders valid a licence issued in accordance with Annex 1 by another Contracting State, the validity of the authorisation;",
        answers: [
          { text: "shall not extend beyond the period of validity of the licence.", correct: true },
          { text: "depends on the regulations of the contracting state which renders valid the licence.", correct: false },
          { text: "shall not extend beyond one year for ATPL and CPL.", correct: false },
          { text: "is only considered for PPL.", correct: false }
        ]
      },
      {
        question: "As part of the total flight time requirement of 1500 hours, the applicant for an Airline Transport Pilot Licence aeroplane shall have completed not less than 200 hours of cross-country flight time on aeroplanes. How much of this shall be pilot-in-command time or co-pilot time under the supervision of the pilot in command, performing the duties and functions of a pilot in command, provided that the method of supervision employed is acceptable to the licensing authority?",
        answers: [
          { text: "75 hours.", correct: false },
          { text: "10 hours.", correct: false },
          { text: "100 hours.", correct: true },
          { text: "50 hours.", correct: false }
        ]
      },
      {
        question: "Who is charged with the safe conduct of a flight?",
        answers: [
          { text: "The pilot-in-command.", correct: true },
          { text: "The aircraft owner.", correct: false },
          { text: "The ATC controller whenever the aircraft is flying in controlled airspace.", correct: false },
          { text: "The airline operator.", correct: false }
        ]
      },
      {
        question: "The registration mark shall be letters, numbers or a combination of letters and numbers and shall be that assigned by the;",
        answers: [
          { text: "Ministry of Transport and the Ministry of Defense in the state of registry.", correct: false },
          { text: "the International Telecommunication Union.", correct: false },
          { text: "the International Civil Aviation Organisation.", correct: false },
          { text: "the state of registry or common mark registering authority.", correct: true }
        ]
      },
      {
        question: "When letters are used for the registration mark, combinations shall not be used which might be confused with the;",
        answers: [
          { text: "letters used for ICAO identification documents.", correct: false },
          { text: "five letter combinations used in the international code of signals.", correct: true },
          { text: "four letter combinations beginning with Q.", correct: false },
          { text: "three letters combinations used in the international code of signals.", correct: false }
        ]
      },
      {
        question: "The procedure for the pilot-in-command of an aircraft to be followed in case of intercepting a distress transmission is;",
        answers: [
          { text: "record the position of the transmission, proceed according to the flight plan, complete the SAR report form at the next airport, indicating where you can be reached in order to supply further information.", correct: false },
          { text: "hold at the position where the distress signal and/or message is received, coordinate the SAR operation by using the appropriate VHF and/or HF frequencies until released by a SAR unit.", correct: false },
          { text: "record the position of the craft in distress if given, if possible take a bearing of the transmission, inform the appropriate RCC or ASS and, while awaiting instructions, proceed at your discretion towards the position given in the transmission.", correct: true },
          { text: "record the position of the craft in distress, take a bearing of transmission, inform the appropriate RCC or ATS using the appropriate VHF and/or HF frequencies, proceed on the most expeditious way towards the position given in transmission.", correct: false }
        ]
      },
    {
        question: "The aircraft has made a complete stop on the apron. When leaving the aircraft, one of the passengers walks into the trailing edge of the wing and gets seriously injured.",
        answers: [
          { text: "This is an incident. The pilot-in-command must report it to the airport authority within the next 48 hours.", correct: false },
          { text: "This is a matter of passenger insurance as the flight is terminated and the aeroplane doors are open. The airport operator or the company in charge of the handling shall establish a report for the insurance company.", correct: false },
          { text: "This is an irregularity in the handling. The handling agent must inform his insurance company.", correct: false },
          { text: "This is an accident. The crew must follow the procedure relevant for this case.", correct: true }
        ]
      },
      {
        question: "During the climb-out phase of a flight the pilot-in-command becomes incapacitated. The co-pilot takes over control of the aircraft and decides that he will return for landing. What action has to be taken after landing?",
        answers: [
          { text: "This is an irregularity in the operation. The operator must inform the Authority by writing and Irregularity Report.", correct: false },
          { text: "This is an irregularity. The pilot-in-command or the Operator must deposit a report on behalf of the involved airport Authority within the following 48 hours.", correct: false },
          { text: "This is a serious incident. The crew must follow the procedure relevant to an incident.", correct: true },
          { text: "This is an accident. The crew must follow the procedure relevant to an accident.", correct: false }
        ]
      },
      {
        question: "Runway edge lights shall consist of at least;",
        answers: [
          { text: "flashing lights showing variable yellow.", correct: false },
          { text: "flashing lights showing variable green.", correct: false },
          { text: "fixed lights showing steady green.", correct: false },
          { text: "fixed lights showing variable white.", correct: true }
        ]
      },
      {
        question: "When a threshold is displaced, what colour shall the lights have in approach direction between the beginning of the runway and the displaced threshold?",
        answers: [
          { text: "flashing red, intermittent with flashing white.", correct: false },
          { text: "white.", correct: false },
          { text: "red.", correct: true },
          { text: "blue, this portion of the runway is considered as taxiway.", correct: false }
        ]
      },
      {
        question: "The colour of fixed, unidirectional Runway End Lights is;",
        answers: [
          { text: "white.", correct: false },
          { text: "red.", correct: true },
          { text: "yellow.", correct: false },
          { text: "green.", correct: false }
        ]
      },
      {
        question: "If a licence holder is unable to perform the flight crew functions appropriate to that licence due to illness, the authority must be informed;",
        answers: [
          { text: "if still not fit to fly when his/her current medical certificate expires.", correct: false },
          { text: "after 21 days of consecutive 'illness'.", correct: true },
          { text: "after one calendar month of consecutive illness.", correct: false },
          { text: "as soon as possible if the illness is expected to last more than 21 days.", correct: false }
        ]
      },
      {
        question: "If a pilot is carrying out single pilot commercial passenger transport operations how does the validity of his class 1 medical change on his 40th birthday?",
        answers: [
          { text: "from 12 months to 3 months.", correct: false },
          { text: "from 36 months to 24 months.", correct: false },
          { text: "from 24 months to 12 months.", correct: false },
          { text: "from 12 months to 6 months.", correct: true }
        ]
      },
      {
        question: "If an arriving aircraft is making a straight-in approach a departing aircraft may take off in any direction;",
        answers: [
          { text: "until ten minutes before the arriving aircraft is estimated to be over the instrument runway.", correct: false },
          { text: "until five minutes before the arriving aircraft is estimated to be over the instrument runway.", correct: true },
          { text: "until two minutes before the arriving aircraft is estimated to be over the instrument runway.", correct: false },
          { text: "until three minutes before the arriving aircraft is estimated to be over the instrument runway.", correct: false }
        ]
      },
      {
        question: "If an international commercial air service is operated with a single pilot aircraft, what is the maximum age of the pilot?",
        answers: [
          { text: "65", correct: false },
          { text: "60", correct: false },
          { text: "69", correct: false },
          { text: "59", correct: true }
        ]
      },
      {
        question: "If no ICAO identifier has been attributed to an alternate airport (box 16) of a flight plan form;",
        answers: [
          { text: "write XXXX in box 16 and indicate in box 18 (additional information) ALTN/followed by the name of the airport.", correct: false },
          { text: "write XXXX in box 16 and indicate in box 18 (additional information) DEGT/followed by the name of the airport.", correct: false },
          { text: "write ZZZZ in box 16 and indicate in box 18 (additional information) DEGT/followed by the name of the airport.", correct: false },
          { text: "write ZZZZ in box 16 and indicate in box 18 (additional information) ALTN/followed by the name of the airport.", correct: true }
        ]
      },
    {
        question: "If radio communication is established during an interception but communications in a common language is not possible, which phrase should be pronounced by the intercepting aircraft to request the intercepted aircraft to descend for landing?",
        answers: [
          { text: "Descend", correct: true },
          { text: "Descend for landing", correct: false },
          { text: "You land", correct: false },
          { text: "Let down", correct: false }
        ]
      },
      {
        question: "If radio contact with the intercepting aircraft is established but communication on a common language is not possible, which phrase should be pronounced by the intercepted aircraft to communicate that he is unable to comply with the instructions received?",
        answers: [
          { text: "CAN NOT", correct: true },
          { text: "UNABLE TO COMPLY", correct: false },
          { text: "CAN NOT COMPLY", correct: false },
          { text: "NOT POSSIBLE", correct: false }
        ]
      },
      {
        question: "If the crew on an arriving aircraft approaching a controlled aerodrome will report 'field in sight', a clearance for 'visual approach' may be given under certain conditions;",
        answers: [
          { text: "the meteorological visibility must not be less than 8 km.", correct: false },
          { text: "continued approach will be according to VFR.", correct: false },
          { text: "the air traffic controller will provide separation to other controlled traffic.", correct: true },
          { text: "the approach must be passing the FAF.", correct: false }
        ]
      },
      {
        question: "IFR cruising levels within controlled airspace shall be given as flight level (FL);",
        answers: [
          { text: "when the QNH is higher than the standard pressure 1013 hPa.", correct: false },
          { text: "only in airspace class A.", correct: false },
          { text: "if the obstacle clearance is more than 2000 feet.", correct: false },
          { text: "above the transition altitude when applicable.", correct: true }
        ]
      },
      {
        question: "In a precision approach Category I lighting system, the centre line and crossbar lights shall be;",
        answers: [
          { text: "fixed lights showing variable white.", correct: true },
          { text: "fixed lights showing variable green.", correct: false },
          { text: "flashing lights showing variable green.", correct: false },
          { text: "flashing lights showing variable white.", correct: false }
        ]
      },
      {
        question: "In a precision approach Category I lighting system, the single, two and three light sources on the centre line have a length of;",
        answers: [
          { text: "150 m.", correct: false },
          { text: "250 m.", correct: false },
          { text: "200 m.", correct: false },
          { text: "300 m.", correct: true }
        ]
      },
      {
        question: "In case of parallel runways, each runway designation number shall be supplemented;",
        answers: [
          { text: "by a letter for 2 parallel runways.", correct: false },
          { text: "by a number like '0' and '01' for 2 parallel runways.", correct: false },
          { text: "by a letter - for example 3 parallel runways 'L' and 'R' and the central has no letter.", correct: false },
          { text: "by a letter - for example 2 parallel runways 'L' and 'R' - for 3 'L', 'C' and 'R'.", correct: true }
        ]
      },
      {
        question: "In certain circumstances a medical examination may be deferred at the discretion of the licensing authority, provided that such deferment shall only be made as an exception and shall not exceed;",
        answers: [
          { text: "a single period of six months in the case of a flight crew member of an aircraft engaged in commercial operations.", correct: false },
          { text: "two consecutive periods each of three months in the case of a flight crew member of an aircraft engaged in non commercial operations.", correct: false },
          { text: "a single period of six months in the case of a flight crew member of an aircraft engaged in non commercial operations.", correct: true },
          { text: "in the case of a private pilot, a single period of 12 months.", correct: false }
        ]
      },
      {
        question: "In order to avoid confusion, the identification numbers given to each prohibited area, restricted area and danger area shall not be re-used for a period of;",
        answers: [
          { text: "at least 6 months after cancellation of the area to which they refer.", correct: false },
          { text: "at least 2 months after cancellation of the area to which they refer.", correct: false },
          { text: "at least one year after cancellation of the area to which they refer.", correct: true },
          { text: "at least 3 months after cancellation of the area to which they refer.", correct: false }
        ]
      },
      {
        question: "In order to meet the wake turbulence criteria, what minimum separation should be applied when a Medium aircraft is taking off behind a Heavy aircraft and both are using the same runway?",
        answers: [
          { text: "4 minutes", correct: false },
          { text: "1 minute", correct: false },
          { text: "3 minutes", correct: false },
          { text: "2 minutes", correct: true }
        ]
      },
    {
        question: "In order to meet wake turbulence criteria, for arriving aircraft and using timed approaches, what minima shall be applied to aircraft landing behind a Heavy or a Medium aircraft?",
        answers: [
          { text: "Light aircraft behind Medium aircraft - 4 minutes.", correct: false },
          { text: "Medium aircraft behind Heavy aircraft - 2 minutes.", correct: true },
          { text: "Medium aircraft behind Heavy aircraft - 3 minutes.", correct: false },
          { text: "Medium aircraft other Medium aircraft - 2 minutes.", correct: false }
        ]
      },
      {
        question: "In the 'Aerodrome Reference Code' the code element 2 shall identify;",
        answers: [
          { text: "the length of the aircraft fuselage.", correct: false },
          { text: "the width of the aircraft wing.", correct: false },
          { text: "Only the aircraft wing span.", correct: false },
          { text: "the aircraft wing span and the outer main gear wheel span.", correct: true }
        ]
      },
      {
        question: "In the case of parallel runways, each runway designation number shall be supplemented;",
        answers: [
          { text: "by a letter - for example 3 parallel runways 'L' and 'R' and the central has no letter.", correct: false },
          { text: "by a number like '0' and '01' for 2 parallel runways.", correct: false },
          { text: "by a letter for 2 parallel runways.", correct: false },
          { text: "by a letter - for example 2 parallel runways 'L' and 'R' - for 3 'L', 'C' and 'R'.", correct: true }
        ]
      },
      {
        question: "In the event of being hijacked in an area where regional procedures have not been established, the pilot should;",
        answers: [
          { text: "fly a standard racetrack pattern at the next reporting point on track and await ATC instructions.", correct: false },
          { text: "fly a left-hand racetrack pattern at the next reporting point on track and await ATC instructions.", correct: false },
          { text: "fly a right-hand orbit and await ATC instructions.", correct: false },
          { text: "proceed at a level which differs from the cruising levels normally used for IFR flight in the area by 300 m (1000 ft) above FL290 in non-RVSM airspace or 150 m (500 ft) above FL290 in RVSM airspace or below FL290.", correct: true }
        ]
      },
      {
        question: "In the event that a controlled flight inadvertently deviates from its current flight plan, the appropriate ATS unit has to be informed;",
        answers: [
          { text: "it is a deviation from the track.", correct: false },
          { text: "the estimated time is in error by more than 10 minutes.", correct: false },
          { text: "the TAS varies by plus or minus 5% of the TAS notified in the flight plan.", correct: true },
          { text: "of an emergency.", correct: false }
        ]
      },
      {
        question: "In the 'PAPI' system the pilot during an approach will see the two units nearest the runway as red and the two units farthest from the runway as white when;",
        answers: [
          { text: "only on the approach slope.", correct: false },
          { text: "below the approach slope.", correct: false },
          { text: "above the approach slope.", correct: false },
          { text: "on or close to the approach slope.", correct: true }
        ]
      },
      {
        question: "In the 'VASIS', how many light units are in each wing bar?",
        answers: [
          { text: "4.", correct: true },
          { text: "3.", correct: false },
          { text: "5.", correct: false },
          { text: "2.", correct: false }
        ]
      },
      {
        question: "In which section of AIP are contained information elements relating to prohibited, restricted and dangerous areas?",
        answers: [
          { text: "ENR", correct: true },
          { text: "AGA", correct: false },
          { text: "GEN", correct: false },
          { text: "MAP", correct: false }
        ]
      },
      {
        question: "Inadvertent changes from a Flight Plan: The appropriate ATS unit has to be informed;",
        answers: [
          { text: "about any track deviation.", correct: false },
          { text: "about any deviation in TAS.", correct: false },
          { text: "if the time estimate for the next reporting point is found to be in error in excess of more than ten minutes from that notified to ATS.", correct: false },
          { text: "if the average TAS at cruising level varies or is expected to vary by ±5% from that given in the flight plan.", correct: true }
        ]
      },
      {
        question: "Independent parallel approaches may be conducted to parallel runways provided that;",
        answers: [
          { text: "the missed approach track for one approach diverges by at least 25° (degrees) from the missed approach track of the adjacent approach.", correct: false },
          { text: "the missed approach track for one approach diverges by at least 45° (degrees) from the missed approach track of the adjacent approach.", correct: false },
          { text: "the missed approach track for one approach diverges by at least 30° (degrees) from the missed approach track of the adjacent approach.", correct: true },
          { text: "the missed approach track for one approach diverges by at least 20° (degrees) from the missed approach track of the adjacent approach.", correct: false }
        ]
      }

           
];
  


startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  if (selectedAnswerText) {
    storeAnswer();
    currentQuestionIndex++;

    // If this is the last question, finish the quiz
    if (currentQuestionIndex < shuffledQuestions.length) {
      setNextQuestion();
    } else {
      clearInterval(timerInterval); // Stop the timer once the quiz is finished
      showScore(); // Show the score and hide the "Next" button
    }
  }
});

saveButton.addEventListener('click', saveResults);
sendButton.addEventListener('click', sendResults);

function startQuiz() {
  // Show the password input field
  document.getElementById('password-container').classList.remove('hide');

  // Hide the start button
  startButton.classList.add('hide');
}

document.getElementById('submit-password-btn').addEventListener('click', () => {
  const enteredPassword = document.getElementById('quiz-password').value;
    numQuestionsToSolve = document.getElementById('num-questions').value;

  if (enteredPassword !== "1234") {
    alert("Incorrect password. You cannot start the quiz.");
    return; // Exit if password is wrong
  }

  // If password is correct, hide the password container and start the quiz
  document.getElementById('password-container').classList.add('hide');
  questionContainerElement.classList.remove('hide');
  shuffledQuestions = shuffleArray(questions);
    // Convert the number of questions to solve into an integer, unless it's "all"
      if (numQuestionsToSolve !== 'all') {
        shuffledQuestions = shuffledQuestions.slice(0, parseInt(numQuestionsToSolve));
      }
  currentQuestionIndex = 0;
  score = 0;
  userChoices = []; // Reset user choices

  //totalTime = shuffledQuestions.length * 15; // Total quiz time (15 seconds per question)
 // startTimer(totalTime);

  setNextQuestion();
});

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);

  // Check if it's the last question and update the "Next" button to say "Finish"
  if (currentQuestionIndex === shuffledQuestions.length - 1) {
    nextButton.innerText = "Finish";
  } else {
    nextButton.innerText = "Next";
  }

  // Update question number and progress bar
  progressText.innerText = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    // In the setNextQuestion function, update the percentage text:
    const progressPercentage = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length} (${progressPercentage.toFixed(0)}%)`;
}

function showQuestion(question) {
  selectedAnswerText = null; // Reset selected answer for the new question
  correctAnswerText = getCorrectAnswer(question); // Store the correct answer for the current question

  questionElement.innerHTML = `${question.question}`;

  // Shuffle the answers before displaying them
  const shuffledAnswers = shuffleArray(question.answers);

  shuffledAnswers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;

  // Store the last selected answer
  selectedAnswerText = selectedButton.innerText;

  // Disable all buttons after one is clicked
  Array.from(answerButtonsElement.children).forEach(button => {
    button.disabled = true; // Disable all buttons
  });

  // Check if the selected answer is correct
  const isCorrect = selectedButton.dataset.correct === 'true';

  if (isCorrect) {
    // Set the selected button's background to green for correct answer
    selectedButton.style.backgroundColor = 'lightgreen';
  } else {
    // Set the selected button's background to red for incorrect answer
    selectedButton.style.backgroundColor = 'lightcoral';

    // Highlight the correct answer in green
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === 'true') {
        button.style.backgroundColor = 'lightgreen';
      }
    });
  }

  // Show the "Next" button after an answer is selected
  nextButton.classList.remove('hide');
}

function storeAnswer() {
  const isCorrect = selectedAnswerText === correctAnswerText;
  if (isCorrect) score++; // Increment score only if the answer is correct

  userChoices.push({
    question: shuffledQuestions[currentQuestionIndex].question,
    selectedAnswer: selectedAnswerText,
    correctAnswer: correctAnswerText,
    isCorrect: isCorrect
  });
}

// Function to get the correct answer text for the current question
function getCorrectAnswer(question) {
  const correctAnswer = question.answers.find(answer => answer.correct);
  return correctAnswer.text;
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

/*function startTimer(seconds) {
  timerElement.innerText = seconds;
  timerInterval = setInterval(() => {
    seconds--;
    timerElement.innerText = seconds;
    if (seconds <= 0) {
      clearInterval(timerInterval);
      showScore(); // Automatically show the score when the time runs out
    }
  }, 1000);
}*/

function showScore() {
  questionContainerElement.classList.add('hide');
  scoreContainer.classList.remove('hide');
  nextButton.classList.add('hide'); // Hide the "Next" button on the results page

  const totalQuestions = shuffledQuestions.length;
  const correctAnswers = score;
  const wrongAnswers = totalQuestions - correctAnswers;
  const finalScore = (correctAnswers / totalQuestions) * 100;

  // Determine Pass or Fail status
  const passOrFail = finalScore >= 75 ? `<span style="color: green;">PASS</span>` : `<span style="color: red;">FAIL</span>`;

  // Display the total number of questions, correct answers, wrong answers, and the final score
  scoreDisplay.innerHTML = `
    <p>Total Questions: ${totalQuestions}</p>
    <p>Correct Answers: ${correctAnswers}</p>
    <p>Wrong Answers: ${wrongAnswers}</p>
    <p>Your Score: ${finalScore.toFixed(2)}% ${passOrFail}</p>
  `;
    
    // Display "INCORRECT ANSWERS" heading only if there are wrong answers
      if (wrongAnswers > 0) {
        const incorrectHeading = document.createElement('h2');
        incorrectHeading.innerText = 'WRONG ANSWERS';
        incorrectHeading.style.color = 'red';
        scoreContainer.appendChild(incorrectHeading);
      }

    // Display only wrong answers
      const summary = document.createElement('div');
      userChoices.forEach(choice => {
        if (!choice.isCorrect) {  // Only display wrong answers
          const questionSummary = document.createElement('div');
          questionSummary.innerHTML = `
            <p><strong>Question:</strong> ${choice.question}</p>
            <p style="color:red;"><strong>Your Answer:</strong> ${choice.selectedAnswer}</p>
            <p><strong>Correct Answer:</strong> ${choice.correctAnswer}</p>
            <hr>
          `;
          summary.appendChild(questionSummary);
        }
      });

      scoreContainer.appendChild(summary);
}

// Function to save the results to a local file
function saveResults() {
  const studentName = document.getElementById('student-name').value;
  const studentSurname = document.getElementById('student-surname').value;

  if (!studentName || !studentSurname) {
    alert("Please enter your name and surname.");
    return;
  }

  // Generate the filename with the current date
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const fileName = `${studentName}_${studentSurname}_${formattedDate}.txt`;

  // Generate results file content
  const resultsFileContent = generateResultsFile(studentName, studentSurname);

  // Create a Blob and trigger download
  const blob = new Blob([resultsFileContent], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

// Function to generate quiz results as text
function generateResultsFile(studentName, studentSurname) {
  const totalQuestions = shuffledQuestions.length;
  const correctAnswers = score;
  const wrongAnswers = totalQuestions - correctAnswers;
  const finalScore = (correctAnswers / totalQuestions) * 100;

  let results = `Name: ${studentName}\n`;
  results += `Surname: ${studentSurname}\n`;
  results += `Total Questions: ${totalQuestions}\n`;
  results += `Correct Answers: ${correctAnswers}\n`;
  results += `Wrong Answers: ${wrongAnswers}\n`;
  results += `Your Score: ${finalScore.toFixed(2)}%\n\n`;
  results += `Question Breakdown:\n`;

  userChoices.forEach(choice => {
    results += `Question: ${choice.question}\n`;
    results += `Your Answer: ${choice.selectedAnswer}\n`;
    results += `Correct Answer: ${choice.correctAnswer}\n\n`;
  });

  return results;
}

// Function to send the results via email using mailto
function sendResults() {
  const studentName = document.getElementById('student-name').value;
  const studentSurname = document.getElementById('student-surname').value;

  if (!studentName || !studentSurname) {
    alert("Please enter your name and surname.");
    return;
  }

  const resultsFileContent = generateResultsFile(studentName, studentSurname);

  // Use mailto to open the default email client with the results pre-filled
  const emailSubject = encodeURIComponent("Quiz Results");
  const emailBody = encodeURIComponent(resultsFileContent);
  window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
}

document.getElementById('restart-btn').addEventListener('click', () => {
  window.location.reload();
});

// Function to shuffle an array (Fisher-Yates Algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
