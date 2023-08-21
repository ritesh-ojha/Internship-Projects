import json
import csv

filename = "1359540.json"

with open("json_folder/"+filename) as f:
    data = json.load(f)

rows = []

# ID,Innings,Overs,BallNumber,Batter,Bowler,NonStriker,ExtraType,
# BatsmanRun,ExtrasRun,TotalRun,IsWicketDelivery,PlayerOut,Kind,
# FieldersInvolved,BattingTeam

ID = filename.split('.')[0]

for i, inning in enumerate(data['innings']):
    if i == 0:
        inning_num = 1
    else:
        inning_num = 2
    for over in inning['overs']:
        over_num = over['over']
        for i, delivery in enumerate(over['deliveries']):
            ball_num = i + 1
            
            batsman = delivery['batter']
            bowler = delivery['bowler']
            NonStriker = delivery['non_striker']
            extra = delivery.get('extras',{})   # in get funtion we take keyname then value
            extra_type = ','.join(extra.keys())  # we are joining if multiple extra type
            batsman_run = delivery['runs'].get('batter',0)
            extra_run = delivery['runs'].get('extras',0)
            total_run = delivery['runs'].get('total',0)
            wickets = delivery.get('wickets')
            is_wicket = 1 if 'wickets' in delivery else 0
            if is_wicket:
                player_out = wickets[0]['player_out']
                kind = wickets[0]['kind']
           
                fielders = []
                if kind == "bowled":
                    fielders = "NA"
                else:   
                    for f in wickets[0].get('fielders',[]):
                        fielders.append(f['name'])
                    fielders = ','.join(fielders)


            else:
                player_out = 'NA'
                kind = 'NA'
                fielder = 'NA'

            




            row = [ID, inning_num , over_num, ball_num, batsman, bowler, NonStriker, extra_type, batsman_run, extra_run, total_run, is_wicket, player_out ,kind, fielder]
            rows.append(row)

print(rows)
