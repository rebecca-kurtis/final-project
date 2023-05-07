import { React, useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import FormTextBox from "../components/cardConfigure/FormTextbox";
import FormSelection from "../components/cardConfigure/FormSelection";
import FormCheckBoxes from "../components/cardConfigure/FormCheckboxes";
import axios from "axios";


export default function CardConfigure() {
  const [recipientFName, setRecipientFName] = useState('');
  const [relationship, setRelationship] = useState('Friend');
  const [occasion, setOccasion] = useState('Birthday');
  const [mood, setMood] = useState('Happy');
  const [proseStyle, setProseStyle] = useState('Ode');
  const [themes, setThemes] = useState([] as string[]);
  const [from, setFrom] = useState('username');
  const [message, setMessage]= useState("");

  const relationshipOptions = ["Partner", "Wife", "Husband", "Father", "Mother", "Brother", "Sister", "Uncle", "Aunt", "Cousin", "Grandmother", "Grandfather", "Boss", "Employee", "Friend"];
  const occasionOptions = ["Birthday", "Anniversary", "Get Well", "Sorry For Your Loss", "Welcome Home", "Mothes Day", "Fathers Day", "New Baby", "Condolences", "Congrats", "Farewell", "Graduation", "Just Because", "Wedding", "Thank-you", "Welcome", "Valentines Day", "Christmas", "Happy Holidays", "New Year", "Easter", "Thanksgiving", "St. Patricks Day", "I'm Sorry" ];
  const moodOptions = ["Happy", "Optimistic", "Silly", "Sympathetic", "Romantic", "Excited", "Fearful", "Regretful"];
  const themeOptions = ["Love", "Romance", "Death", "Nature", "Beauty","Spirituality", "Aging", "Identity", "Travel", "Dreams", "Recovery", "New Life", "Dissapointment", "Immortality", "Coming of Age", "Desire", "Destiny", "Courage", "Happiness", "God", "Friendship", "Heartbreak", "Imagination", "Tragedy", "Memories", "Rebirth", "Spring", "Winter", "Summer", "Autumn", "Secrets", "Peace", "Pain", "Earth", "Faith", "Forgiveness", "Afterlife", "Joy", "Purpose", "Regret", "Innocence", "Duty", "Change"];
  const proseOptions = ["Free Verse", "Perfect Rhyme", "Haiku", "Sonnet", "Limerick", "Villanelle", "Ode"];

  //themechange is based on checkmarks being on or off
  //if on they are added to a string, if off they are removed.
  const themeChange = (event) => {
    event.target.checked ? setThemes([...themes, event.target.value]) : setThemes(themes.filter(theme => theme !== event.target.value));
  }

  const route = process.env.REACT_APP_SERVER + ":" + process.env.REACT_APP_SERVER_PORT + "/chatGPT"

  const handleGPTSubmit = (event) => {
    event.preventDefault();
    const prompt = {
      relationship, 
      proseStyle, 
      occasion, 
      themes, 
      mood
    }

    axios
    .post(route, prompt)
    .then(()=> console.log('Request Sent: ', prompt))
    .catch((err) => {
      console.log(err);
    })

  }

  useEffect(() => {
    fetch(route)
    .then((res) => res.json())
    .then((data) => setMessage(data.message));
  }, []);

  return (
    <main>
     
      <div className="spacer-tag home" />
      <section className="pages">
      <PageTitle
        message={"Let Aunt Bottie Create a Custom Message for You."}
      />
      <p> {route}</p>
        <form onSubmit={handleGPTSubmit}>
            <FormTextBox
            labelText="Who is the Gift for?"
            name="recipientsFName"
            value={recipientFName || "Add a name"}
            onChange={name => setRecipientFName(name.target.value)}
            />

            <FormSelection
            labelText="Their Relationship to You?"
            name="relationship"
            value={relationship}
            onChange={relationship => setRelationship(relationship.target.value)}
            selectOptions = {relationshipOptions} 
            />

            <FormSelection
            labelText="What is the Occasion?"
            name="occasion"
            value={occasion}
            onChange={occasion => setOccasion(occasion.target.value)}
            selectOptions = {occasionOptions} 
            />

            <FormSelection
            labelText="What Kind of Mood Would You Like?"
            name="mood"
            value={mood}
            onChange={mood => setMood(mood.target.value)}
            selectOptions = {moodOptions} 
            />

            <FormCheckBoxes 
              groupText="What themes would you like the card to be about?"
              name="themes"
              value={themes}
              onChange={themeChange}
              selectOptions={themeOptions}
            />
            <FormSelection
            labelText="What Style of Poem? (need to build a pop up here to explain)"
            name="proseStyle"
            value={proseStyle}
            onChange={proseStyle => setProseStyle(proseStyle.target.value)}
            selectOptions = {proseOptions} 
            />
         
            <FormTextBox
            labelText="Would you like it to be from a different name?"
            name="from"
            value={from}
            onChange={from => setFrom(from.target.value)}
            />
          <div>
          <p><input type="submit" value="Generate Message" /></p>
          </div>
        </form>
        {
        /* the following is for verifying we have control of states.
        Should be removed later.
        <div>
          {recipientFName} <br />
          {relationship}<br />
          {occasion}<br />
          {mood}<br />
          {themes.map((theme, index) => (
            index + 1 === themes.length ? `${theme}` : `${theme}, `
          ))}
          <br />
          {proseStyle}<br />
          {from}<br />
        </div>
          */
          }
          <div>
            <p>{message}</p>
          </div>

      </section>
    </main>
  );
};