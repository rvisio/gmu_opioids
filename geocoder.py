import requests

def geocoder():
    endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    apiKey = 'AIzaSyDjp_hwGsHn7ledcZ8VuGvtRKe63OjBgvg'

    indictedDoctorList = [1053372201, 1003130352, 1912940677, 1841583994,1023079274 , 1265539860,1326019712 ,1508834706 ,
                          1528087970,1558540807, 1093726556,1275748675,1346377595,1598807547 ,1922047091,1942220017,
                          1184677957,1477504157,1154471621 ,1932293115 ,1043292477 , 1386831253,1982607370,1376537399,
                          1639175763 ,1053423764, 1912909490, 1174575187, 1104924349,1285632240 ,1902818743 ,1184952442,
                          1114056082, 1710929609]

    for npi in indictedDoctorList:
        npiEndpoint = 'https://npiregistry.cms.hhs.gov/api/?number=' + str(npi)
        r = requests.get(npiEndpoint)
        print(r.d)



if __name__=='__main__':
    geocoder()
