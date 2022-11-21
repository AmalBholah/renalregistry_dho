const frailty_scale = [
  "Very Fit",
  "Fit",
  "Managing Well",
  "Very mild Frailty",
  "Mild Frailty",
  "Moderate Frailty",
  "Severe Frailty",
  "Very severe frailty",
  "Terminally ill",
];

const padValue = (value) => {
  return value < 10 ? "0" + value : value;
};

let UTILS = {
  calculateEGFR: (creatinine, years, isblack, gender) => {
    var isBlackFactor = 1;
    var isGenderFemale = 1;
    if (isblack.toString() == "true") {
      isBlackFactor = 1.212;
    }
    if (gender) {
      isGenderFemale = 0.742;
    }
    var x = parseFloat(creatinine.toString()) * 0.011312;
    var y = 175 * Math.pow(x, -1.154);
    var z = y * Math.pow(years, -0.203);
    var result = parseFloat(z * isBlackFactor * isGenderFemale).toFixed(2);
    if (isNaN(result)) {
      return 0;
    } else {
      return result;
    }
  },
  calculateURR: (UreaPreHD, UreaPostHD) => {
    let x = UreaPostHD / UreaPreHD;
    let y = 1 - x;
    let results = parseFloat(100 * y).toFixed(2);
    if (isNaN(results)) {
      return 0;
    } else {
      return results;
    }
  },
  calculateDialysisEfficiency: (
    PostBUN,
    PreBUN,
    Dialysisduration,
    UF,
    Weight
  ) => {
    let results = parseFloat(
      -Math.log(PostBUN / PreBUN - 0.008 * Dialysisduration) +
        (4 - 3.5 * (PostBUN / PreBUN)) * (UF / Weight)
    ).toFixed(2);

    if (isNaN(results)) {
      return 0;
    } else {
      return results;
    }
  },
  ClinicalFrailtyScaleExplanativeText: (value) => {
    return frailty_scale[value - 1];
  },
  formatSimpleDate: (dateVal) => {
    var newDate = new Date(dateVal);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var sMonth = monthNames[newDate.getMonth()];
    var sDay = padValue(newDate.getDate());
    var sYear = newDate.getFullYear();

    return sDay + " " + sMonth + " " + sYear;
  },
  setTempMemory: (data) => {
    window.localStorage.setItem("renalregmemarea", JSON.stringify(data));
  },
  getTempMemory: () => {
    let data = window.localStorage.getItem("renalregmemarea");
    return JSON.parse(data);
  },
  setTempMemoryModeofdialysis: (data) => {
    window.localStorage.setItem("modeofdialysis", JSON.stringify(data));
  },
  getTempMemoryModeofdialysis: () => {
    let data = window.localStorage.getItem("modeofdialysis");
    return JSON.parse(data);
  },
  setTempMemoryDialysis: (data) => {
    window.localStorage.setItem("dialysis", JSON.stringify(data));
  },
  getTempMemoryDialysis: () => {
    let data = window.localStorage.getItem("dialysis");
    return JSON.parse(data);
  },
};

export default UTILS;
