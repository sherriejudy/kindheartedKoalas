 -- create fake data 
insert into kpark.parkingSpots VALUES (null, 'testImgURL', true, 'some parking spot',1,2,current_timestamp(), current_timestamp());
insert into kpark.leases VALUES (null, 'Kevin', 'Major', current_timestamp(), current_timestamp(), '12', 100.15, current_timestamp(), current_timestamp(), 1);
insert into kpark.addresses VALUES (null, 'parkingSpot', '5A', '100', 'Edmund Ave', 'NW', 'TORONTO', 'M4V 1H2', current_timestamp(), current_timestamp(), 1, null);

insert into kpark.parkingSpots VALUES (null, 'othertestImg', true, 'Kevin Spot',3,4, '2019-01-01', '2019-12-31');
insert into kpark.leases VALUES (null, 'Judy', 'Hu', '2019-01-01', '2019-06-30', '52', 35.15, current_timestamp(), current_timestamp(), 2);
insert into kpark.addresses VALUES (null, 'parkingSpot',  '7G', '20', 'Yonge St', null, 'TORONTO', 'M4V 3H5', current_timestamp(), current_timestamp(), 2, null);
