const promise = new Promise((res, rej) => {
  console.log("runs immediately");
  const shouldFail = true;
  setTimeout(() => {
    if (shouldFail) {
      rej("Something went wrong..");
    } else {
      res("Runs after 1sec");
    }
  }, 1000);
  console.log("Runs after");
});
promise
  .then((value) => {
    console.log("Resolved with:", value);
  })
  .catch((error) => {
    console.log("Error occured:", error);
  });

function apiResponse(url: string) {
  return new Promise((res, rej) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => res(data))
      .catch((err) => rej(err));
  });
}

function apiRes(url: string) {
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Invalid Response");
    }
    return res.json();
  });
}

function setTimeoutPromise(delay: number) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(
        "Promise being resolved after 'n' seconds as it gets called based on delay given by user",
      );
    }, delay),
  );
}

setTimeoutPromise(3000)
  .then((result) => {
    console.log("Here is the result:", result);
    return setTimeoutPromise(5000);
  })
  .then((result) => {
    console.log("Five seconds after first call:", result);
    return "That's It";
  })
  .then((result) => console.log(result, "Done"));

let obj = {
  name: "krishna",
  address: {
    location: {
      address: {
        place: {
          street: {
            lane: "Stambalagaruvu",
            city: "Guntur",
          },
        },
      },
    },
  },
};

// {name: "harkirat", building_name: "PNR Cnstructions", city: "delhi"}

let output: Record<string, any> = {};

function traverse(obj: Record<string, any>) {
  for (let key in obj) {
    if (typeof obj[key] === typeof obj) {
      traverse(obj[key]);
    } else {
      output[key] = obj[key];
    }
  }
}

traverse(obj);
console.log(output);
