import http
import json

def webPageToText(url):
    import urllib.request, urllib.error, urllib.parse
    response = urllib.request.urlopen(url)
    html = response.read()
    text = str(html)
    return text

text = webPageToText("https://www.localconditions.com/weather-o-fallon-missouri/63366/past.php")

days = text.split("#day")
days = days[1:]

i = 0
grandTotal = 0.0
data = {}
data['data'] = []
for day in days:
    if i < 7:
        dateEndIndex = day.find("2020") + 4
        totalStartIndex = day.find("in.") - 6
        total = day[totalStartIndex:totalStartIndex + 5]
        if total.startswith("an>"):
            total = float(0.000)
        elif total.startswith(" "):
            total = float(total[1:])
        grandTotal = grandTotal + float(total)
        data['data'].append({
            'date': day[3:dateEndIndex],
            'rain_total': float(total)
        })
        #print(day[3:dateEndIndex] + ": " + str(total))
    i = i + 1

data['data'].append({
    'date': 'Total',
    'rain_total': grandTotal
})

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)