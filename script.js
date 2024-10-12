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
      { text: "10 miles from the centre of the aerodrome.", correct: false },
      { text: "20 miles from the centre of the aerodrome.", correct: false },
      { text: "15 miles from the centre of the aerodrome.", correct: false },
      { text: "5 nautical miles from the centre of the aerodrome.", correct: true }
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
    question: "A controlled flight is requested to inform the appropriate ATC unit whenever the average True Air Speed at cruising level varies by;",
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
      { text: "The aerodrome is being used by gliders.", correct: true },
      { text: "Special precautions while landing.", correct: false },
      { text: "An area unit for the movement of aircraft.", correct: false },
      { text: "Bad state of the taxiways.", correct: false }
    ]
  },
  {
    question: "A flashing red light from control tower during an approach to land means;",
    answers: [
      { text: "Continue circling.", correct: false },
      { text: "The airport is unsafe, do not land.", correct: true },
      { text: "The airport is temporarily closed.", correct: false },
      { text: "Give way to other aircraft.", correct: false }
    ]
  },
  {
    question: "If radio communication is established during an interception but communications in a common language are not possible, which phrase should be pronounced by the intercepting aircraft to request the intercepted aircraft to descend for landing?",
    answers: [
      { text: "Descend.", correct: true },
      { text: "Descend for landing.", correct: false },
      { text: "You land.", correct: false },
      { text: "Let down.", correct: false }
    ]
  },
  {
    question: "If radio contact with the intercepting aircraft is established but communication in a common language is not possible, which phrase should be pronounced by the intercepted aircraft to communicate inability to comply?",
    answers: [
      { text: "CAN NOT.", correct: true },
      { text: "UNABLE TO COMPLY.", correct: false },
      { text: "CAN NOT COMPLY.", correct: false },
      { text: "NOT POSSIBLE.", correct: false }
    ]
  },
  {
    question: "On aerodromes, aircraft taxiing on the manoeuvring area shall give way to;",
    answers: [
      { text: "Other converging aircraft.", correct: false },
      { text: "Aircraft taking off.", correct: true },
      { text: "All vehicles except the “follow me” vehicle.", correct: false },
      { text: "Other vehicles and pedestrians.", correct: false }
    ]
  },
  {
    question: "Except when clearance is obtained from an ATC unit, a VFR flight cannot enter or leave a control zone when ceiling is less than;",
    answers: [
      { text: "1000 feet or visibility is less than 8 km.", correct: false },
      { text: "1000 feet or visibility is less than 5 km.", correct: false },
      { text: "1500 feet or visibility is less than 5 km.", correct: true },
      { text: "2000 feet or visibility is less than 5 km.", correct: false }
    ]
  },
  {
      question: "The VMC minima for an airspace classified as “B” above 10.000 feet MSL are;",
      answers: [
        { text: "1 nautical mile horizontally and 1000 feet vertically from clouds, 8 km visibility.", correct: false },
        { text: "1500 metres horizontally, 1000 feet vertically from clouds, 8 km visibility.", correct: true },
        { text: "1 mile horizontally and 1000 feet vertically from clouds, 5 km visibility.", correct: false },
        { text: "clear of clouds, 8 km visibility.", correct: false }
      ]
    },
    {
      question: "The VMC minima for an airspace classified as “G” above 10.000 feet MSL are;",
      answers: [
        { text: "1 nautical mile horizontally and 1000 feet vertically from clouds, 5 km visibility.", correct: false },
        { text: "1500 m horizontally, 1000 feet vertically from clouds, 8 km visibility.", correct: true },
        { text: "1 nautical mile horizontally and 1000 feet vertically from clouds, 8 km visibility.", correct: false },
        { text: "1500 m horizontally and 1000 feet vertically from clouds, 5 km visibility.", correct: false }
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
      question: "Interception: An aircraft equipped with SSR transponder which is intercepted by another aircraft shall immediately, unless otherwise instructed by the appropriate air traffic service unit, select Mode A;",
      answers: [
        { text: "Code 7000.", correct: false },
        { text: "Code 7700.", correct: true },
        { text: "Code 7600.", correct: false },
        { text: "Code 7500.", correct: false }
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
      question: "Definitions: A manoeuvre in which a turn is made away from a designated track followed by a turn in the opposite direction to permit the aircraft to intercept and proceed along the reciprocal of the designated track is called a;",
      answers: [
        { text: "Race track", correct: false },
        { text: "Procedure turn", correct: true },
        { text: "Reversal track", correct: false },
        { text: "Base turn", correct: false }
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
      question: "Aerodrome traffic is;",
      answers: [
        { text: "All traffic in the aerodrome circuit.", correct: false },
        { text: "All traffic on the manoeuvring area and flying in the vicinity of an aerodrome.", correct: true },
        { text: "All traffic on the movement area and flying in the vicinity of an aerodrome.", correct: false },
        { text: "All traffic on the manoeuvring area.", correct: false }
      ]
    },
    {
      question: "Final approach segment: During a precision approach (ILS), glide path interception occurs normally at heights above runway elevation between;",
      answers: [
        { text: "300 m (984 ft) to 900 m (2955 ft).", correct: true },
        { text: "300 m (984 ft) to 600 m (1968 ft).", correct: false },
        { text: "150 m (492 ft) to 300 m (984 ft).", correct: false },
        { text: "150 m (492 ft) to 900 m (2955 ft).", correct: false }
      ]
    },
    {
      question: "Approach procedures - Missed approach - Phases. A complete missed approach procedure consists of the following phases;",
      answers: [
        { text: "Arrival, Intermediate and Final.", correct: false },
        { text: "Initial, Intermediate and Final.", correct: true },
        { text: "Initial and Final.", correct: false },
        { text: "Arrival, Initial, Intermediate and Final.", correct: false }
      ]
    },
  {
      question: "Approach Procedures - Circling. The term used to describe the visual phase of flight after completing an instrument approach, to bring an aircraft into position for landing on a runway which is not suitably located for straight-in approach, is;",
      answers: [
        { text: "Visual approach.", correct: false },
        { text: "Visual manoeuvring (circling).", correct: true },
        { text: "Contact approach.", correct: false },
        { text: "Aerodrome traffic pattern.", correct: false }
      ]
    },
    {
      question: "Approach Procedures - Circling. It is permissible to eliminate from consideration a particular sector where a prominent obstacle exists in the visual manoeuvring (circling) area outside the final approach and missed approach area. When this option is exercised, the published procedure;",
      answers: [
        { text: "permits circling only in VMC.", correct: false },
        { text: "recommends not to perform circling within the total sector in which the obstacle exists.", correct: false },
        { text: "prohibits circling within the total sector in which the obstacle exists.", correct: true },
        { text: "prohibits the circling approach to the affected runway.", correct: false }
      ]
    },
    {
      question: "Holding procedures - Outbound time. The outbound time in a holding pattern above 14.000 ft in still air conditions is;",
      answers: [
        { text: "2 minutes 30 seconds.", correct: false },
        { text: "2 minutes.", correct: false },
        { text: "1 minute.", correct: false },
        { text: "1 minute 30 seconds.", correct: true }
      ]
    },
    {
      question: "Low intensity obstacle lights on mobile objects shall be;",
      answers: [
        { text: "flashing red or preferably yellow.", correct: true },
        { text: "fixed red or preferably orange.", correct: false },
        { text: "fixed red or preferably blue.", correct: false },
        { text: "flashing blue.", correct: false }
      ]
    },
    {
      question: "Low intensity obstacle lights on fixed objects shall be;",
      answers: [
        { text: "flashing red.", correct: false },
        { text: "fixed orange.", correct: false },
        { text: "flashing yellow.", correct: false },
        { text: "fixed red.", correct: true }
      ]
    },
    {
      question: "ICAO ANNEX 14 - Visual aids for navigation - Lights: The colour of the fixed, unidirectional Runway End Lights shall be;",
      answers: [
        { text: "green.", correct: false },
        { text: "white.", correct: false },
        { text: "red.", correct: true },
        { text: "yellow.", correct: false }
      ]
    },
    {
      question: "Visual ground signals: A double white cross displayed horizontally in the signal area indicates that;",
      answers: [
        { text: "this area is unfit for the movement of aircraft.", correct: false },
        { text: "special precautions is needed while approaching for landing on the runway in use.", correct: false },
        { text: "the aerodrome is being used by gliders and that glider flights are being performed.", correct: true },
        { text: "special precautions must be observed due to the state of the taxiways.", correct: false }
      ]
    },
    {
      question: "The aerodrome category for rescue and fire fighting is based on;",
      answers: [
        { text: "the over-all length of the longest aeroplane normally using the aerodrome and its maximum fuselage width.", correct: true },
        { text: "the over-all length of the longest aeroplane normally using the aerodrome and its maximum fuselage weight.", correct: false },
        { text: "the over-all length of the longest aeroplane.", correct: false },
        { text: "the longest aeroplane maximum width only.", correct: false }
      ]
    },
    {
      question: "The obligation of a carrier to transport any person away from the territory of a Contracting State shall terminate from the moment such person has been definitely admitted in other Contracting State of destination.",
      answers: [
        { text: "The obligation is for the Contracting State of the operator.", correct: false },
        { text: "The obligation of the operator terminates as soon as the person leaves the aeroplane.", correct: false },
        { text: "The stated above is correct.", correct: true },
        { text: "The operator has no obligation.", correct: false }
      ]
    },
    {
      question: "Accident, incident notification and reporting. After landing, while taxiing towards the apron, the landing gear of your aircraft sinks into a hole. Nobody gets injured, but the aircraft sustains structural damage. This obliges the crew to delay the departure.",
      answers: [
        { text: "This is an incident and the pilot-in-command must report it to the airport authority within the next 48 hours.", correct: false },
        { text: "Since there is no person injured and the flight is terminated, a damage report has to be made out with the services of the aerodrome in charge of the runway and taxiways for the insurance company.", correct: false },
        { text: "This is an irregularity in the operation. The crew must inform the operator of the aerodrome and establish a report.", correct: false },
        { text: "This is an accident and the crew must follow the procedure relevant to this case.", correct: true }
      ]
    },
  {
      question: "The Alerting Service is provided by;",
      answers: [
        { text: "the Area Control Centres.", correct: false },
        { text: "the ATC unit responsible for the aircraft at that moment, when it is provided with 121.5 MHz.", correct: false },
        { text: "the ATS unit responsible for the aircraft at that moment.", correct: true },
        { text: "only by ATC units.", correct: false }
      ]
    },
    {
      question: "The phases related to an aircraft in emergency or believed in emergency are;",
      answers: [
        { text: "uncertainty phase, urgency phase, distress phase.", correct: false },
        { text: "uncertainty phase, alert phase, distress phase.", correct: true },
        { text: "uncertainty phase, distress phase, urgency phase.", correct: false },
        { text: "uncertainty phase, alert phase, distress phase and urgency phase.", correct: false }
      ]
    },
    {
      question: "A radio communications, 'Distress' differs from 'Urgency' because in the first case;",
      answers: [
        { text: "there is a serious and imminent danger requiring immediate assistance.", correct: true },
        { text: "the aeroplane will not be able to reach a suitable aerodrome.", correct: false },
        { text: "the aeroplane has suffered damages which impair its fitness to fly.", correct: false },
        { text: "the aeroplane or a passenger's safety require the flight immediately interrupted.", correct: false }
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
      question: "General provisions - handling an ATC-flight plan in case of a delay. In the event of a delay for an uncontrolled flight for which a flight plan has been submitted, the flight plan should be amended or a new flight plan submitted and the old one cancelled, when the delay is exceeding the original;",
      answers: [
        { text: "estimated departure time by 30 minutes.", correct: false },
        { text: "estimated off-block time by 30 minutes.", correct: false },
        { text: "estimated off-block time by 60 minutes.", correct: true },
        { text: "estimated departure time by 60 minutes.", correct: false }
      ]
    },
    {
      question: "Communication Failure - Flight Procedures. You are on a flight in accordance with IFR in IMC, exactly on the current flight plan route. At 18:36 UTC you receive and acknowledge the following instruction from the radar controller; 'Turn immediately, fly heading 050° until further advised'. At 18:37 UTC you discover a communication failure. Two way radio communication cannot be established again.",
      answers: [
        { text: "You continue on Heading 050 for 15 minutes.", correct: false },
        { text: "You continue on Heading 050.", correct: false },
        { text: "You continue on Heading 050 for 30 minutes.", correct: false },
        { text: "You have to return to your current flight plan route.", correct: true }
      ]
    },
    {
      question: "Separation methods and minima - Vertical separation (VSM) acc. Above flight level FL 290 the Vertical Separation Minimum (VSM) for aircraft flying in the same direction shall be;",
      answers: [
        { text: "4000 feet.", correct: true },
        { text: "3000 feet.", correct: false },
        { text: "1500 feet.", correct: false },
        { text: "2000 feet.", correct: false }
      ]
    },
    {
      question: "Approach procedures - Minimum Sector Altitudes / MSA. Minimum Sector Altitudes are established for each aerodrome. The MSA provides an obstacle clearance of at least 300 m (984 ft) within a circle, associated with the homing facility for the approach procedure of that aerodrome. How many NM is the radius of this circle ?",
      answers: [
        { text: "10 NM", correct: false },
        { text: "25 NM", correct: true },
        { text: "5 NM", correct: false },
        { text: "20 NM", correct: false }
      ]
    },
    {
      question: "Separation in the vicinity of aerodromes - Timed approaches. A 'Timed Approach Procedure' may be utilized as necessary in order to expedite the approaches of a number of arriving aircraft. This will be obtained by requesting aircraft to;",
      answers: [
        { text: "notify the time when passing a specified point.", correct: false },
        { text: "pass a specified point inbound at the previously notified time.", correct: true },
        { text: "keep distance and time equal between aircraft in the approach.", correct: false },
        { text: "maintain a specified airspeed during the approach procedure.", correct: false }
      ]
    },
    {
      question: "Unless otherwise prescribed, what is the rule regarding level to be maintained by an aircraft flying IFR outside controlled airspace ?",
      answers: [
        { text: "2000 feet above the highest obstacle within 8 nautical miles of course.", correct: false },
        { text: "1000 feet above the highest obstacle within 8 kilometres of the estimated position of the aircraft.", correct: true },
        { text: "2000 feet above the highest obstacle within 8 kilometres of course.", correct: false },
        { text: "1000 feet above the highest obstacle within 8 nautical miles of course.", correct: false }
      ]
    },
  {
      question: "Aircraft “A” with an ATC clearance is flying in VMC conditions within a control area. Aircraft “B” with no ATC clearance is approaching at approximately the same altitude and on a converging course. Which has the right of way?",
      answers: [
        { text: "Aircraft “A” regardless of the direction which “B” is approaching.", correct: false },
        { text: "Aircraft “B” if “A” is on its left.", correct: true },
        { text: "Aircraft “B” regardless of the direction “A” is approaching.", correct: false },
        { text: "Aircraft “A” if “B” is on its right.", correct: false }
      ]
    },
    {
      question: "Which of the following actions shall be taken in case of a controlled flight deviates from the track?",
      answers: [
        { text: "Notify ATC of the new track immediately and comply with instructions.", correct: false },
        { text: "If VMC, maintain this condition, waiting for the ATC instructions.", correct: false },
        { text: "Inform the ATC unit immediately.", correct: false },
        { text: "Adjust the heading of aircraft to regain track as soon as practicable.", correct: true }
      ]
    },
    {
      question: "While on IFR flight, a pilot has an emergency which causes a deviation from an ATC clearance. What action must be taken?",
      answers: [
        { text: "Squawk 7700.", correct: false },
        { text: "Request an amended clearance or cancel the IFR flight plan.", correct: false },
        { text: "Submit a detailed report to ATC within 24 hours.", correct: false },
        { text: "The appropriate ATC unit shall be notified of the action taken as soon as circumstances permit.", correct: true }
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
      question: "An aircraft is flying under Instrument Flight Rules in an area where the visibility is unlimited and the sky is clear (free of clouds), when it totally loses radio communications. The procedure to be followed is;",
      answers: [
        { text: "adopt a VFR flight level and continue flight onto destination.", correct: false },
        { text: "descend to En-route Minimum Safe Altitude and join closest airfield open to IFR operations.", correct: false },
        { text: "continue flight onto destination, complying with last received clearances then with filed flight plan.", correct: false },
        { text: "land on the closest appropriate aerodrome, then advise Air Traffic Services of landing.", correct: true }
      ]
    },
    {
      question: "A red flare addressed to a flying aircraft means;",
      answers: [
        { text: "Not with standing any previous instructions, do not land for the time being.", correct: true },
        { text: "Dangerous airfield. Do not land.", correct: false },
        { text: "Come back and land.", correct: false },
        { text: "Give way to another aircraft and hold the circuit.", correct: false }
      ]
    },
    {
      question: "Definitions (ICAO Doc 8168). What is: A turn executed by the aircraft during the initial approach between the end of the outbound track and the beginning of the intermediate or final approach track. The tracks are not reciprocal.",
      answers: [
        { text: "Race track", correct: false },
        { text: "Base turn", correct: true },
        { text: "Procedure turn", correct: false },
        { text: "Reversal procedure", correct: false }
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
      question: "A notice containing information concerning flight safety, air navigation, technical, administration or legislative matters and originated at the AIS of a state is called;",
      answers: [
        { text: "Aeronautical Information Circular (AIC).", correct: true },
        { text: "NOTAM.", correct: false },
        { text: "AIRAC.", correct: false },
        { text: "Aeronautical Information Publication (AIP).", correct: false }
      ]
    },
    {
      question: "Aeronautical Information Service: Name the acronym signifying the system aimed at advance notification based on common effective dates, of circumstances that necessitate significant changes in operating practices.",
      answers: [
        { text: "NOTAM RAC", correct: false },
        { text: "ATS NOTAM", correct: false },
        { text: "AIRAC", correct: true },
        { text: "Advisory NOTAM", correct: false }
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
      question: "“Instrument runways” are the following runways intended for the operation of aircraft using instrument approach procedures;",
      answers: [
        { text: "Instrument approach runways, precision approach runways category I, II and III.", correct: false },
        { text: "Precision approach runways in general.", correct: false },
        { text: "Precision approach runways category I, II and III.", correct: false },
        { text: "Non-precision approach runways, precision approach runways category I, II and III.", correct: true }
      ]
    },
    {
      question: "“Code letter D” shall be chosen to identify a taxiway used by aircraft having an outer main gear wheel span of less than 9 m. The taxiway width shall be;",
      answers: [
        { text: "23 m.", correct: false },
        { text: "18 m.", correct: true },
        { text: "25 m.", correct: false },
        { text: "15 m.", correct: false }
      ]
    },
    {
      question: "Which “code letter” shall be chosen to identify a taxiway to be used by an aircraft having a wheelbase of 15 m?",
      answers: [
        { text: "Code letter “E”.", correct: false },
        { text: "Code letter “B”.", correct: false },
        { text: "Code letter “C”.", correct: true },
        { text: "Code letter “D”.", correct: false }
      ]
    },
    {
      question: "According to the “Aerodrome Reference Code”, the “Code Letter E” shall identify an aircraft wing span of;",
      answers: [
        { text: "36 m up to but not including 52 m.", correct: false },
        { text: "24 m up to but not including 36 m.", correct: false },
        { text: "52 m up to but not including 65 m.", correct: true },
        { text: "15 m up to but not including 24 m.", correct: false }
      ]
    },
    {
      question: "The “Aerodrome Reference Code” is a code composed of two elements which are related to the aeroplane performance characteristics and dimensions. These elements are a combination of a number and a letter as in the example under listed;",
      answers: [
        { text: "4F.", correct: false },
        { text: "5E.", correct: false },
        { text: "2B.", correct: true },
        { text: "6D.", correct: false }
      ]
    },
    {
      question: "According to the “Aerodrome Reference Code” the “Code number 4” shall identify an aircraft reference field length of;",
      answers: [
        { text: "1200 m.", correct: false },
        { text: "1800 m and over.", correct: true },
        { text: "1500 m.", correct: false },
        { text: "1600 m.", correct: false }
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
      question: "Taxiway centre line lights other than an exit taxiway shall be;",
      answers: [
        { text: "fixed lights showing green.", correct: true },
        { text: "fixed lights showing white.", correct: false },
        { text: "fixed lights showing blue.", correct: false },
        { text: "fixed lights showing yellow.", correct: false }
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
      question: "The abbreviation PAPI stands for;",
      answers: [
        { text: "Precision Approach Power Index.", correct: false },
        { text: "Precision Approach Path Indicator.", correct: true },
        { text: "Precision Approach Power Indicator.", correct: false },
        { text: "Precision Approach Path Index.", correct: false }
      ]
    },
    {
      question: "The “PAPI” shall consist of;",
      answers: [
        { text: "two wing bars of 4 sharp transition multi-lamp or paired units equally spaced.", correct: false },
        { text: "a wing bar of 4 sharp transition multi-lamp or paired units equally spaced.", correct: true },
        { text: "two wing bars of 6 sharp transition multi-lamp or paired units equally spaced.", correct: false },
        { text: "a wing bar of 2 sharp transition multi-lamp equally spaced.", correct: false }
      ]
    },
    {
      question: "In the “PAPI” system the pilot during an approach will see the two units nearest the runway as red and the two units farthest from the runway as white when;",
      answers: [
        { text: "only on the approach slope.", correct: false },
        { text: "below the approach slope.", correct: false },
        { text: "above the approach slope.", correct: false },
        { text: "on or close to the approach slope.", correct: true }
      ]
    },
    {
      question: "In case of parallel runways, each runway designation number shall be supplemented;",
      answers: [
        { text: "by a letter for 2 parallel runways.", correct: false },
        { text: "by a number like “0” and “01” for 2 parallel runways.", correct: false },
        { text: "by a letter - for example 3 parallel runways “L” and “R” and the central has no letter.", correct: false },
        { text: "by a letter - for example 2 parallel runways “L” and “R” - for 3 “L”, “C” and “R”.", correct: true }
      ]
    },
    {
      question: "Taxiway edge lights shall be;",
      answers: [
        { text: "flashing showing blue.", correct: false },
        { text: "fixed showing yellow.", correct: false },
        { text: "fixed showing green.", correct: false },
        { text: "fixed showing blue.", correct: true }
      ]
    },
    {
      question: "Runway end lights shall be;",
      answers: [
        { text: "fixed unidirectional lights showing white in the direction of the runway.", correct: false },
        { text: "fixed lights showing variable white.", correct: false },
        { text: "fixed unidirectional lights showing red in the direction of the runway.", correct: true },
        { text: "fixed lights showing variable red.", correct: false }
      ]
    },
    {
      question: "Runway threshold lights shall be;",
      answers: [
        { text: "fixed unidirectional lights showing white in the direction of approach to the runway.", correct: false },
        { text: "fixed unidirectional lights showing green in the direction of approach to the runway.", correct: true },
        { text: "fixed lights green colours.", correct: false },
        { text: "fixed lights showing green or white colours.", correct: false }
      ]
    },
    {
      question: "ICAO Annex 14 - Visual aids for navigation - Lights: Runway edge lights shall consist of at least;",
      answers: [
        { text: "flashing lights showing variable yellow.", correct: false },
        { text: "flashing lights showing variable green.", correct: false },
        { text: "fixed lights showing steady green.", correct: false },
        { text: "fixed lights showing variable white.", correct: true }
      ]
    },
    {
      question: "Runway threshold identification lights, when provided, should be;",
      answers: [
        { text: "flashing white.", correct: true },
        { text: "flashing green.", correct: false },
        { text: "fixed green.", correct: false },
        { text: "fixed white.", correct: false }
      ]
    },
    {
      question: "The light shown by an “Aerodrome Identification Beacon” at a land aerodrome shall be;",
      answers: [
        { text: "white and green colour identification given by Morse Code.", correct: false },
        { text: "green colour identification given by Morse Code.", correct: true },
        { text: "blue colour identification given by Morse Code.", correct: false },
        { text: "white colour identification given by Morse Code.", correct: false }
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
      question: "High intensity obstacle lights should be;",
      answers: [
        { text: "fixed red.", correct: false },
        { text: "flashing white.", correct: true },
        { text: "fixed orange.", correct: false },
        { text: "flashing red.", correct: false }
      ]
    },
    {
      question: "Air Traffic Service unit means;",
      answers: [
        { text: "Air Traffic Control units, Flight Information Centres or Air Services reporting offices.", correct: true },
        { text: "Air Traffic Control units and Flight Information Centres.", correct: false },
        { text: "Flight Information Centres and Air Services reporting offices.", correct: false },
        { text: "Air Traffic Control units and Air Services reporting offices.", correct: false }
      ]
    },
    {
      question: "Which condition is requested so that an aerodrome may be considered controlled?",
      answers: [
        { text: "The aerodrome shall be located within a controlled airspace.", correct: false },
        { text: "The aerodrome shall be located within a Control Zone.", correct: false },
        { text: "The aerodrome shall be located within a Control Zone (CTR) and provided with a Control Tower.", correct: false },
        { text: "The aerodrome shall be provided with a Control Tower.", correct: true }
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
      question: "Control Area (CTA) is defined as follows;",
      answers: [
        { text: "A controlled airspace extending upwards from a specified limit above the earth.", correct: true },
        { text: "A controlled airspace extending upwards from a height of 1000 feet above the earth.", correct: false },
        { text: "A controlled airspace extending upwards from the surface of the earth to a specified limit.", correct: false },
        { text: "A controlled airspace extending upwards from a height of 900 feet above the earth.", correct: false }
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
      question: "The units providing Air Traffic Services are;",
      answers: [
        { text: "Area Control Centre - Approach Control Office and Aerodrome Control Tower.", correct: false },
        { text: "Area Control Centre - Flight Information Region - Approach Control Office and Tower.", correct: false },
        { text: "Area Control Centre - Flight Information Centre - Approach Control Office - Aerodrome Control Tower and Air Traffic Services reporting office.", correct: true },
        { text: "Area Control Centre - Advisory Centre - Flight Information Centre - Approach Control Office and Tower.", correct: false }
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
      question: "Area Control Centres issue clearances for the purpose of;",
      answers: [
        { text: "achieving separation between IFR flights.", correct: false },
        { text: "providing flight Information Service.", correct: false },
        { text: "providing advisory service.", correct: false },
        { text: "achieving separation between controlled flights.", correct: true }
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
      question: "You receive an IFR enroute clearance stating; Clearance expires at 0920. What does it mean?",
      answers: [
        { text: "If not airborne until 0920, a new clearance has to be issued.", correct: true },
        { text: "After 0920 return to the ramp and file a new flight plan.", correct: false },
        { text: "Do not take off before 0920.", correct: false },
        { text: "The take off clearance is expected at 0920.", correct: false }
      ]
    },
    {
      question: "When are ATIS broadcasts updated?",
      answers: [
        { text: "Only when the ceiling and/or visibility changes by a reportable value.", correct: false },
        { text: "Upon receipt of any official weather, regardless of content change or reported values.", correct: true },
        { text: "Every 30 minutes if weather conditions are below those for VFR, otherwise hourly.", correct: false },
        { text: "Only when weather conditions change enough to require a change in the active runway or instrument approach in use.", correct: false }
      ]
    },
    {
      question: "When it becomes apparent that an aircraft is in difficulty, the decision to initiate the alert phases is the responsibility of the;",
      answers: [
        { text: "flight information or control organisations.", correct: false },
        { text: "search and rescue co-ordination centres.", correct: false },
        { text: "operational air traffic control centres.", correct: true },
        { text: "air traffic co-ordination services.", correct: false }
      ]
    },
    {
      question: "Separation methods and minima - Vertical separation. The Vertical Separation Minimum (VSM) between flights in accordance with IFR, within controlled airspace below FL 290 is;",
      answers: [
        { text: "2000 feet (600 m).", correct: false },
        { text: "2500 feet (750 m).", correct: false },
        { text: "1000 feet (300 m).", correct: true },
        { text: "500 feet (150 m).", correct: false }
      ]
    },
    {
      question: "Separation methods and minima - Vertical separation. The Vertical Separation Minimum (VSM) between flights in accordance with IFR, within controlled airspace above FL 290 is;",
      answers: [
        { text: "4000 feet (1200 m).", correct: false },
        { text: "2000 feet (600 m).", correct: true },
        { text: "1000 feet (300 m).", correct: false },
        { text: "500 feet (150 m).", correct: false }
      ]
    },
    {
      question: "Which code shall be used on Mode “A” to provide recognition of an emergency aircraft?",
      answers: [
        { text: "Code 7500.", correct: false },
        { text: "Code 7000.", correct: false },
        { text: "Code 7700.", correct: true },
        { text: "Code 7600.", correct: false }
      ]
    },
    {
      question: "One of the functions ensured by a radar control unit for the provision of approach control service is;",
      answers: [
        { text: "to conduct surveillance radar approaches.", correct: true },
        { text: "to apply a reduced vertical separation of 500 feet between IFR flights and VFR flights.", correct: false },
        { text: "to provide instructions in order to reduce separations minima, if accepted by the pilots.", correct: false },
        { text: "to apply a horizontal separation less than 5 NM.", correct: false }
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

  if (enteredPassword !== "1234") {
    alert("Incorrect password. You cannot start the quiz.");
    return; // Exit if password is wrong
  }

  // If password is correct, hide the password container and start the quiz
  document.getElementById('password-container').classList.add('hide');
  questionContainerElement.classList.remove('hide');
  shuffledQuestions = shuffleArray(questions);
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

  // Display a summary of user's answers
  const summary = document.createElement('div');
  userChoices.forEach(choice => {
    const questionSummary = document.createElement('div');
    
    // If the user's answer is wrong, apply red font color
    const answerClass = choice.isCorrect ? '' : 'style="color:red;"';
    
    questionSummary.innerHTML = `
      <p><strong>Question:</strong> ${choice.question}</p>
      <p ${answerClass}><strong>Your Answer:</strong> ${choice.selectedAnswer}</p>
      <p><strong>Correct Answer:</strong> ${choice.correctAnswer}</p>
      <hr>
    `;
    
    summary.appendChild(questionSummary);
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
