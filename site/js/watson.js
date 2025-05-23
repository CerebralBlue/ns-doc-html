
function loadWatson() {
  function handleWelcome(event) {
    const element = document.createElement('div');
    element.setAttribute('class', 'customClass');
    element.innerHTML = "<div class='welcome'>Hi!<img class='handDown' src='https://neuralseek.com/wp-content/uploads/2022/12/waving.svg'></div>";
    event.data.element.appendChild(element);
  }

  function customResponseHandler(event) {
    const { message } = event.data;
    switch (message.user_defined.template_name) {
      case 'welcome':
        handleWelcome(event);
        break;
      default:
        console.error('Unhandled response type.');
    }
  }

  window.watsonAssistantChatOptions = {
    integrationID: "b69d352d-9da8-411b-8ce3-8767977df7f6",
    region: "us-south",
    serviceInstanceID: "e9269e17-5fa9-491f-b57b-c2837d9cc744",
    onLoad: function (instance) {
      function preReceiveHandler(event) {
        data = event.data;
        type = event.type;
        if (type == "pre:receive") {
          var generic = data.output.generic;
          for (let i = 0; i < generic.length; i++) {
            var item = generic[i];
            if (item.response_type == "text") {
              var text = item.text;
              if (text != "" && text.toUpperCase().startsWith("[[URL]]")) {
                // get the array delimited with '|'
                args = text.substring(7).split('|');
                if (args.length > 0) {
                  url = args[0];
                  page_name = "web page";
                  target = "_self";
                  if (args.length > 1) {
                    page_name = args[1];
                  }
                  if (args.length > 2) {
                    target = args[2];
                  }
                  item.text = `Great, let me take you to the ${page_name}.`;
                  setTimeout(() => {
                    instance.closeWindow();
                    window.open(url, target);
                  }, 1500);
                } else {
                  item.text = "Sorry, did not understand which URL to load.";
                }
              }
              if (text != "" && text.toUpperCase().startsWith("[[DEMO]]")) {
                item.text = "Great, let me take you to our demo request form.";
                setTimeout(() => {
                  instance.closeWindow();
                  window.open("https://neuralseek.com/demo", "_self")
                }, 1500);
              }
              if (text != "" && text.toUpperCase().startsWith("[[VIDEO]]")) {
                item.text = "Great, let me take you to our videos page.";
                setTimeout(() => {
                  instance.closeWindow();
                  window.open("https://neuralseek.com/videos", "_self")
                }, 1500);
              }
              if (text != "" && text.toUpperCase().startsWith("[[SUPPORT]]")) {
                item.text = "Great, let me take you to our support ticketing page.";
                setTimeout(() => {
                  instance.closeWindow();
                  window.open("https://neuralseek.com/supportticket", "_self")
                }, 1500);
              }
              if (text != "" && text.toUpperCase().startsWith("[[DOCUMENT]]")) {
                item.text = "But you are already in the NeuralSeek documentation!";
              }
            }
          }
        }
      }
      //instance.showLauncherGreetingMessage(5000);
      instance.updateLauncherGreetingMessage("Hey! Ask me a question and see NeuralSeek in action 👇");
      instance.on({ type: 'customResponse', handler: customResponseHandler });
      instance.on({ type: 'pre:receive', handler: preReceiveHandler });
      instance.render();
    }
  };
  setTimeout(function () {
    const t = document.createElement('script');
    t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
}

window.addEventListener("load", (event) => {
  loadWatson();
});