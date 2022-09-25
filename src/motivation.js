import ForgeUI, {
  render,
  CustomField,
  useProductContext,
  Text,
  CustomFieldEdit,
  Select,
  Option,
  CheckboxGroup,
  Checkbox,
  useState,
} from "@forge/ui";
import Resolver from "@forge/resolver";
import api, { route } from "@forge/api";
import { getCustomFieldID } from "./index";

const ViewMotivation = () => {
  const {
    extensionContext: { fieldValue },
  } = useProductContext();

  const output = fieldValue === null ? "None" : fieldValue.myMotivationRating;
  return (
    <CustomField>
      <Text>{output}</Text>
    </CustomField>
  );
};

/**
 * Description of motivators, to show in the list of checkboxes.
 * @enum {string}
 */
const motivatorsDescription = {
  m1: "Rewards and incentives (e.g. scope for increased pay and benefits linked to performance)",
  m2: "Development needs addressed (e.g. training opportunities to widen skills; opportunity to specialise)",
  m3: "Variety of work (e.g. making good use of skills, being stretched)",
  m4: "Career path (opportunity for advancement, promotion prospect, career planning)",
  m5: "Empowerment/responsibility (where responsibility is assigned to the person not the task)",
  m6: "Good management (senior management support, team-building, good communication)",
  m7: "Sense of belonging/supportive relationships",
  m8: "Work/life balance (flexibility in work times, caring manager/employer, work location)",
  m9: "Working in successful company (e.g. financially stable)",
  m10: "Employee participation/involvement/working with others",
  m11: "Feedback",
  m12: "Recognition (for a high quality, good job done based on objective criteria – different to 'Rewards and incentives' which is about making sure that there are rewards available)",
  m13: "Equity",
  m14: "Trust/respect",
  m15: "Technically challenging work",
  m16: "Job security/stable environment",
  m17: "Identify with the task (clear goals, personal interest, know purpose of task, how it fits in with whole, job satisfaction; producing identifiable piece of quality work)",
  m18: "Autonomy (e.g. freedom to carry out tasks, allowing roles to evolve)",
  m19: "Appropriate working conditions/environment/good equipment/tools/physical space/quiet",
  m20: "Making a contribution/task significance (degree to which the job has a substantial impact on the lives or work of other people)",
  m21: "Sufficient resources",
};

/**
 * Description of de-motivators, to show in the list of checkboxes.
 * @enum {string}
 */
const deMotivatorsDescription = {
  d1: "Risk",
  d2: "Stress",
  d3: "Inequity (e.g. recognition based on management intuition or personal preference)",
  d4: "Interesting work going to other parties (e.g. outsourcing)",
  d5: "Unfair reward system (e.g. management rewarded for organisational performance; company benefits based on company rank not merit)",
  d6: "Lack of promotion opportunities/stagnation/career plateau/boring work/poor job-fit",
  d7: "Poor communication (feedback deficiency/loss of direct contact with all levels of management)",
  d8: "Uncompetitive pay/poor pay/unpaid overtime",
  d9: "Unrealistic goals/phoney deadlines",
  d10: "Bad relationship with users and colleagues",
  d11: "Poor working environment (e.g. wrong staffing levels/unstable/insecure/lacking in investment and resources; being physically separated from team)",
  d12: "Poor management (e.g. poorly conducted meetings that are a waste of time)",
  d13: "Producing poor quality software (no sense of accomplishment)",
  d14: "Poor cultural fit/stereotyping/role ambiguity",
  d15: "Lack of influence/not involved in decision making/no voice",
};

const EditMotivation = () => {
  /**
   * Process form data and return
   * @param {*} formData
   * @returns {Object} formData + a motivationScore
   */
  const onSubmit = (formData) => {
    formData.motivationScore = false;
    return formData;
  };

  return (
    <CustomFieldEdit
      onSubmit={onSubmit}
      header="Tell us about your motivation?"
      width="large"
    >
      <Select label="Rate how motivated you were: " name="myMotivationRating">
        <Option label="Low" value="Low" />
        <Option label="Somewhat Low" value="Somewhat Low" />
        <Option label="Okay" value="Okay" />
        <Option label="Somewhat High" value="Somewhat High" />
        <Option label="High" value="High" />
      </Select>

      <CheckboxGroup
        label="Select motivator(s) of this ticket (if any): "
        name="motivators"
      >
        <Checkbox value="m1" label={motivatorsDescription.m1} />
        <Checkbox value="m2" label={motivatorsDescription.m2} />
        <Checkbox value="m3" label={motivatorsDescription.m3} />
        <Checkbox value="m4" label={motivatorsDescription.m4} />
        <Checkbox value="m5" label={motivatorsDescription.m5} />
        <Checkbox value="m6" label={motivatorsDescription.m6} />
        <Checkbox value="m7" label={motivatorsDescription.m7} />
        <Checkbox value="m8" label={motivatorsDescription.m8} />
        <Checkbox value="m9" label={motivatorsDescription.m9} />
        <Checkbox value="m10" label={motivatorsDescription.m10} />
        <Checkbox value="m11" label={motivatorsDescription.m11} />
        <Checkbox value="m12" label={motivatorsDescription.m12} />
        <Checkbox value="m13" label={motivatorsDescription.m13} />
        <Checkbox value="m14" label={motivatorsDescription.m14} />
        <Checkbox value="m15" label={motivatorsDescription.m15} />
        <Checkbox value="m16" label={motivatorsDescription.m16} />
        <Checkbox value="m17" label={motivatorsDescription.m17} />
        <Checkbox value="m18" label={motivatorsDescription.m18} />
        <Checkbox value="m19" label={motivatorsDescription.m19} />
        <Checkbox value="m20" label={motivatorsDescription.m20} />
        <Checkbox value="m21" label={motivatorsDescription.m21} />
      </CheckboxGroup>

      <CheckboxGroup
        label="Select de-motivator(s) of this ticket (if any): "
        name="deMotivators"
      >
        <Checkbox value="d1" label={deMotivatorsDescription.d1} />
        <Checkbox value="d2" label={deMotivatorsDescription.d2} />
        <Checkbox value="d3" label={deMotivatorsDescription.d3} />
        <Checkbox value="d4" label={deMotivatorsDescription.d4} />
        <Checkbox value="d5" label={deMotivatorsDescription.d5} />
        <Checkbox value="d6" label={deMotivatorsDescription.d6} />
        <Checkbox value="d7" label={deMotivatorsDescription.d7} />
        <Checkbox value="d8" label={deMotivatorsDescription.d8} />
        <Checkbox value="d9" label={deMotivatorsDescription.d9} />
        <Checkbox value="d10" label={deMotivatorsDescription.d10} />
        <Checkbox value="d11" label={deMotivatorsDescription.d11} />
        <Checkbox value="d12" label={deMotivatorsDescription.d12} />
        <Checkbox value="d13" label={deMotivatorsDescription.d13} />
        <Checkbox value="d14" label={deMotivatorsDescription.d14} />
        <Checkbox value="d15" label={deMotivatorsDescription.d15} />
      </CheckboxGroup>
    </CustomFieldEdit>
  );
};

/**
 * Function to get the motivators and de-motivators count from custom fields for radar chart.
 * @param {*} req
 * @returns {Object} motivators and de-motivators count as nested object
 */
export const getMotivationRatings = async function (req) {
  console.log("getMotivationRatings is being called");

  var jql = `project in (${req.context.extension.project.key})`;
  const response = await api
    .asApp()
    .requestJira(route`/rest/api/3/search?${jql}`);
  const data = await response.json();

  const customFieldID = await getCustomFieldID(data, "motivationScore");

  var motivationsCount = {
    motivators: {},
    deMotivators: {},
  };
  console.log("motivation count initialisation: ", motivationsCount);

  for (var issue of data.issues) {
    //  Example: issueMotivationField  = {
    //   myMotivationRating: 'Low',
    //   motivators: [ 'm1', 'm2', 'm3' ],
    //   deMotivators: ['d2', 'd5'],
    //   motivationScore: false
    //  }
    var issueMotivationField = issue.fields[`${customFieldID}`];

    if (
      issueMotivationField.motivators &&
      issueMotivationField.motivators.length > 0
    ) {
      for (var motivator of issueMotivationField.motivators) {
        if (motivationsCount.motivators[motivator]) {
          motivationsCount.motivators[motivator] += 1;
        } else {
          motivationsCount.motivators[motivator] = 1;
        }
      }
    }

    if (
      issueMotivationField.deMotivators &&
      issueMotivationField.deMotivators.length > 0
    ) {
      for (var deMotivator of issueMotivationField.deMotivators) {
        if (motivationsCount.deMotivators[deMotivator]) {
          motivationsCount.deMotivators[deMotivator] += 1;
        } else {
          motivationsCount.deMotivators[deMotivator] = 1;
        }
      }
    }
  }

  console.log("motivationCount", motivationsCount);
  // Example: motivationsCount = { motivators: {m1: 1, m2: 2, m3: 1}, deMotivators:{d1:6, d2: 1}}
  return motivationsCount;
};

export const renderViewMotivation = render(<ViewMotivation />);
export const renderEditMotivation = render(<EditMotivation />);
