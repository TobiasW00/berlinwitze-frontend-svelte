
<script>
import { createEventDispatcher } from "svelte";
import Modal from '../components/model/model.svelte';


const dispatch = createEventDispatcher();
  function cancel() {
    dispatch("cancel");
  }

</script>

<Modal title="Teilnahmebedingungen" on:cancel>
<div id="teilnahmebedingungenpage">
    <ul>
    <li>
    Mit Ihrer Registrierung erkennen Sie die nachfolgenden Teilnahmebedingungen an. Dies bestätigen Sie bitte mit Anklicken des entsprechenden Abfragefeldes im Registrierungsformular.
    </li><li>
    Ohne die notwendigen Pflichtangaben ist eine Registrierung nicht möglich.
    </li><li>
    Nach Prüfung Ihrer Registrierung werden Sie für den Zugang zu dem LogIn-Bereich freigeschaltet und können svelte.berlin-witze.de im Rahmen der Teilnahmebedingungen nutzen.
    </li><li>
    Sie können Kommentare zu den bereits von anderen Mitgliedern eingestellten witzn abgeben. Diese Kommentare sind nur für registriete Mitglieder sichtbar.
    </li><li>
    Ebenfalls können Sie eigene witzn auf svelte.berlin-witze.de veröffentlichen und so einer breiten öffentlichkeit zugänglich machen. Gleichermaßen können die von Ihnen eingestellten Texte von anderen Nutzern gelesen und kommentiert werden.
    </li>
    <li>
    Beim Einstellen Ihrer Witze versichern Sie als Verfasserin/Verfasser, alleiniger Urheber des Textes zu sein und über sämtliche Rechte an den Texten uneingeschränkt und frei verfügen und diese publizieren dürfen.
    </li>
    <li>
    Ferner versichern Sie als Verfasserin/Verfasser, dass die eingestellten Texte, Inhalte und Kommentare keine Rechte Dritter, insbesondere Persönlichkeitsrechte, Namensrechte, Urheberrechte, Leistungsschutzrechte, gewerbliche Schutzrechte oder sonstige Rechte beeinträchtigen oder verletzen und nicht pornografischer, jugendgefährdender, extremistischer, rassistischer oder gewaltverherrlichender Natur sind und auch keiner gesetzlichen oder behördlichen Verbreitungsbeschränkung unterliegen.
    </li><li>
    Die Beachtung und Einhaltung von Höflichkeit und Anstand bei der Kommentierung fremder Werke wird erwartet und vorausgesetzt.
    </li><li>
    Soweit wir Kenntnis von Zuwiderhandlungen oder Beanstandungen erhalten, werden wir den Text, Inhalt oder Kommentar unverzüglich löschen und Sie über diese Maßnahme per Email informieren. Wir behalten uns ferner vor, Ihren Zugang zu dem LogIn-Bereich zu sperren und Sie von einer weiteren Nutzung des Angebotes auszuschließen.
    </li>
    <li>
    Ihre Daten werden nicht an Dritte weitergegeben oder zu Werbezwecken verwendet. 
    </li>
    <li>
    Soweit gegebenenfalls erforderlich, werden Sie von mir, Tobais Wolter, kontaktiert.
    </li>
    <li>
    Sie können die Witze und ihr Konto jederzeit löschen. Ein Anspruch auf Wiederherstellung etc. besteht nicht.
    </li>
    </ul>
    <br/>
    Stand: 2019
</div>
</Modal>