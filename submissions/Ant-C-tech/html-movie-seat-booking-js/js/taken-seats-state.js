"use strict";

//Information about taken seats. Generating on server and getting after request.

// Emulate server work
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getArrayOfRandomIntWithRandomLength = () => {
    const arrayOfRandomInt = []
    for (let index = 0; index < getRandomIntInclusive(0,55); index++) {
        arrayOfRandomInt.push(getRandomIntInclusive(1,55))
    }
    return arrayOfRandomInt
}

// Result of server work
const takenSeatsState = {
  "2021-02-24": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-02-25": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-02-26": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-02-27": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-02-28": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-03-01": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-03-02": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-03-03": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-03-04": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-03-05": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-03-06": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
};

export default takenSeatsState;
