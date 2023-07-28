const bro = globalThis.browser || globalThis.chrome;

bro.runtime.onMessage.addListener(async(request, sender, sendResponse) => {
  console.log('background-script.js: browser.runtime.onMessage.addListener', request);

  switch (request.action) {
    case 'save-statistics': {
      const { name, clicksCount } = request;
      let { statistics } = await bro.storage.local.get('statistics');
      if (!statistics) {
        statistics = [];
      }

      const statistic = statistics.find(statistic => statistic.name === name);
      if (statistic) {
        statistic.clicksCount += clicksCount;
      } else {
        statistics.push({ name, clicksCount });
      }

      await bro.storage.local.set({ statistics });
    }
  }
});