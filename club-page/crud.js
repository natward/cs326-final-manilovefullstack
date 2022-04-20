export async function getClubUrl(clubName){
    const url = new URL("milfs.com/get-club");

    myUrlWithParams.searchParams.append("club", clubName);
    const response = await fetch(url, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

// don't put params into endpoint
export async function submitApplication(name, grade, experience){
    const response = await fetch(`/apply`, {
        method: 'POST',
        data: {
            "name": name,
            "grade": grade,
            "experience": experience,
        }
    });
    // const data = await response.json();
    // return data;
}

export async function goToEvents(clubName) {

    const url = new URL("milfs.com/events");

    myUrlWithParams.searchParams.append("club", clubName);

    // need to do anything else w clubName??
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }