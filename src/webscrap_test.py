import urllib2
from bs4 import BeautifulSoup

link = "https://www.samhsa.gov/grants-awards-by-state/NY/discretionary/2017/details"

page = urllib2.urlopen(link)

soup = BeautifulSoup(page, "html.parser")

viewContent = soup.find_all('div', class_="views-row")

newFile = open("/Users/robjarvis/Desktop/funding_data.csv","w+")


for hit in viewContent:
    grantee_info = hit.find('div','views-field views-field-field-grantee-name')
    find_program_info = hit.find('div','views-field views-field-title')
    find_city_info = hit.find('div','views-field views-field-field-grantee-city')
    find_funding_info = hit.find('div',class_= 'views-field views-field-field-rfa-award-amount')
    find_congressional_district = hit.find('div',class_= 'views-field views-field-field-congressional-district')
    find_project_period = hit.find('div',class_= 'views-field views-field-field-project-period')

    grantee_info = grantee_info.text.strip().replace(',',' ')
    find_program_info = find_program_info.text.strip().replace(',',' ')
    find_city_info = find_city_info.text.strip().replace(',',' ')
    find_funding_info = find_funding_info.text.strip().replace(',',' ')
    find_congressional_district = find_congressional_district.text.strip().replace(',',' ')
    find_project_period = find_project_period.text.strip().replace(',',' ')

    newFile.write(grantee_info)
    newFile.write(',')
    newFile.write(find_program_info)
    newFile.write(',')
    newFile.write(find_city_info)
    newFile.write(',')
    newFile.write(find_funding_info)
    newFile.write(',')
    newFile.write(find_congressional_district)
    newFile.write(',')
    newFile.write(find_project_period)
    newFile.write('\n')
