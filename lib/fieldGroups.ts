export const EYE_DISEASE_GROUPS: { title: string; keys: string[] }[] = [
  {
    title: 'Patient Information',
    keys: [
      'first_name', 'last_name', 'assessment_date', 'nationality', 'date_of_birth',
      'age', 'gender', 'occupation', 'address', 'city', 'post_code', 'country', 'phone',
      'email', 'wechat', 'emergency_contact_name', 'emergency_contact_phone',
      'emergency_contact_email', 'special_needs',
    ],
  },
  {
    title: 'Disease Information',
    keys: [
      'disease_type', 'specific_diagnosis', 'disease_start_date', 'first_diagnosis_date',
      'diagnosed_by', 'affected_eye', 'condition_progression', 'symptoms_description',
    ],
  },
  {
    title: 'Medical History',
    keys: ['disease_history', 'previous_treatments', 'previous_surgeries', 'family_history'],
  },
  {
    title: 'Other Diseases & Conditions',
    keys: [
      'has_diabetes', 'has_hypertension', 'has_heart_disease', 'has_thyroid_disease',
      'has_autoimmune_disease', 'other_medical_conditions', 'allergies',
    ],
  },
  {
    title: 'Current Medications',
    keys: ['eye_medications', 'systemic_medications', 'supplements'],
  },
  {
    title: 'Vision Data',
    keys: [
      'va_far_od_sc', 'va_far_os_sc', 'va_near_od_sc', 'va_near_os_sc',
      'va_far_od_cc', 'va_far_os_cc', 'va_near_od_cc', 'va_near_os_cc',
      'ark_od_sphere', 'ark_od_cylinder', 'ark_od_axis',
      'ark_os_sphere', 'ark_os_cylinder', 'ark_os_axis',
      'iop_od_contact', 'iop_os_contact', 'iop_od_noncontact', 'iop_os_noncontact',
      'additional_vision_data',
    ],
  },
  {
    title: 'Diagnostic Reports',
    keys: ['report_notes'],
  },
];

export const PSORIASIS_GROUPS: { title: string; keys: string[] }[] = [
  {
    title: 'Patient Information',
    keys: [
      'first_name', 'last_name', 'assessment_date', 'nationality', 'id_passport',
      'date_of_birth', 'age', 'gender', 'occupation', 'religion', 'marital_status',
      'height_cm', 'weight_kg', 'children_count', 'children_ages',
      'address', 'city', 'post_code', 'country', 'phone', 'email', 'wechat', 'languages',
      'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_email',
      'special_needs',
    ],
  },
  {
    title: 'Disease Information',
    keys: [
      'disease_name', 'disease_start_date', 'first_diagnosis_date', 'is_medically_confirmed',
      'psoriasis_location', 'other_psoriasis_types',
    ],
  },
  {
    title: 'History of Disease',
    keys: ['exact_diagnosis', 'year_started', 'disease_description'],
  },
  { title: 'Other Diseases', keys: ['other_diseases'] },
  { title: 'Current Medications', keys: ['current_medications'] },
  {
    title: 'Symptoms',
    keys: [
      'has_rashes', 'has_dry_irritated_skin', 'has_bleeding_patches', 'has_nail_problems',
      'has_nail_detachment', 'has_scalp_plaques',
    ],
  },
  {
    title: 'Vital Signs',
    keys: ['blood_pressure', 'pulse', 'fasting_sugar_level', 'temperature'],
  },
  {
    title: 'Medical History',
    keys: ['medical_history', 'previous_surgeries'],
  },
  {
    title: 'Allergies',
    keys: ['drug_allergies', 'food_intolerances', 'other_allergies'],
  },
  {
    title: 'Lifestyle Factors',
    keys: [
      'exercise_sessions_per_week', 'exercise_minutes_per_session', 'has_exercise_tiredness',
      'exercise_comments', 'is_vegetarian', 'has_balanced_diet',
      'is_occasional_drinker', 'alcohol_type',
      'smoking_packs_per_day', 'smoking_years', 'smoking_stop_year',
      'coffee_cups_per_day', 'coffee_years', 'uses_recreational_drugs', 'recreational_drug_type',
      'has_difficult_bowel_movements', 'has_dry_hard_stool', 'has_unusual_stool_odor',
      'gastrointestinal_issues',
    ],
  },
  {
    title: 'Sleep & Wellbeing',
    keys: [
      'average_sleep_hours', 'sleep_quality', 'has_trouble_falling_asleep', 'wakes_during_night',
      'has_restless_sleep', 'wakes_up_rested', 'sleeping_medication', 'has_snoring',
      'emotional_wellbeing',
    ],
  },
  { title: 'Images', keys: ['image_notes'] },
];

export const REPORT_TYPE_LABELS: Record<number, string> = {
  1: 'Visual Acuity Report',
  2: 'Refraction / AutoRefractoKeratometry',
  3: 'Tonometry data',
  4: 'Slit Lamp exam photo',
  5: 'Corneal Pachymetry',
  6: 'Corneal Endothelial cell count',
  7: 'Corneal Topography',
  8: 'Visual field (Perimetry) test',
  9: 'OCT report',
  10: 'Fundus camera report',
  11: 'ERG report',
  12: 'FFA report',
  13: 'Color Vision Test',
  14: 'ECHO / Ultrasound exam',
  15: 'VEP report',
  16: 'Strabismus / Extraocular muscles exam',
  17: 'External exam report',
};

export const STATUS_LABELS = ['New', 'Reviewed', 'Approved', 'Rejected'];

export const APPLICANT_TYPE_LABELS = ['New Applicant (Free Treatment)', 'Existing Client (Follow-up)'];

export const APPLICATION_TYPE_LABELS = [
  'Paid Treatment (Standard)',
  'Paid Treatment (VIP / Stem Cell)',
  'Subsidized Treatment - Study',
  'Subsidized Treatment - Social Responsibility',
];

export const GENERAL_APPLICATION_GROUPS: { title: string; keys: string[] }[] = [
  {
    title: 'Personal Information',
    keys: ['full_name', 'date_of_birth', 'gender', 'phone', 'email', 'wechat_id', 'country', 'city'],
  },
  {
    title: 'Primary Condition',
    keys: ['condition_name', 'year_of_diagnosis', 'current_severity', 'current_medications', 'treating_physician'],
  },
  {
    title: 'Other Medical Conditions',
    keys: ['other_conditions_checked', 'other_conditions_notes'],
  },
  {
    title: 'Organ Damage / Complications',
    keys: ['has_organ_damage', 'organ_damage_notes'],
  },
  {
    title: 'Previous Treatments',
    keys: ['previous_treatments', 'surgery_only_option'],
  },
  {
    title: 'Current Symptoms & Notes',
    keys: ['current_symptoms', 'additional_notes', 'heard_about_us'],
  },
];
