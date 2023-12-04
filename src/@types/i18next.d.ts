// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import calculator from 'locales/en/calculator.json';
import calldivert from 'locales/en/calldivert.json';
import callregister from 'locales/en/callregister.json';
import chat from 'locales/en/chat.json';
import clock from 'locales/en/clock.json';
import games from 'locales/en/games.json';
import global from 'locales/en/global.json';
import home from 'locales/en/home.json';
import messages from 'locales/en/messages.json';
import phonebook from 'locales/en/phonebook.json';
import profiles from 'locales/en/profiles.json';
import reminders from 'locales/en/reminders.json';
import settings from 'locales/en/settings.json';
import simservices from 'locales/en/simservices.json';
import tones from 'locales/en/tones.json';

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "global";
    // custom resources type
    resources: {
      global: typeof global;
      calculator: typeof calculator;
      calldivert: typeof calldivert;
      callregister: typeof callregister;
      chat: typeof chat;
      clock: typeof clock;
      games: typeof games;
      global: typeof global;
      home: typeof home;
      messages: typeof messages;
      phonebook: typeof phonebook;
      profiles: typeof profiles;
      reminders: typeof reminders;
      settings: typeof settings;
      simservices: typeof simservices;
      tones: typeof tones;
    };
    // other
  }
}