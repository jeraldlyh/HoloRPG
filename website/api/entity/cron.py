import math

from datetime import datetime
from .selectors import get_sorted_user_entities_by_upkeep
from .services import deduct_user_entity
from ..user.services import deduct_player_currency
from ..user.selectors import get_all_users


def deduct_upkeep():
    users = get_all_users()
    time_now = datetime.now()

    for user in users:
        sorted_user_entities = get_sorted_user_entities_by_upkeep(user.user_id)
        
        if sorted_user_entities:
            sum_of_entities_upkeep = 0
            for entity in sorted_user_entities:
                sum_of_entities_upkeep += entity.entity.upkeep * entity.quantity

            if user.currency < sum_of_entities_upkeep:      # Checks if user is able to maintain the upkeep of their entities
                difference = sum_of_entities_upkeep - user.currency
                loop_check = True

                while loop_check:
                    for user_entity in sorted_user_entities:
                        required_quantity = math.ceil(difference / (user_entity.entity.cost * 0.75))             # Checks how many quantity of entity does it need to cover the upkeep
                        print(f"{time_now} | {user} | Current Entity: {user_entity} Require: {required_quantity} | Has: {user_entity.quantity}")

                        if user_entity.quantity >= required_quantity:
                            deduct_user_entity(user_entity, required_quantity)         # Liquidate partial amount
                            loop_check = False
                            break
                        else:
                            deduct_user_entity(user_entity, entity.quantity)           # Full liquidation
            else:
                print(f"{time_now} | {user} | Currency: {user.currency} | Deduction: {sum_of_entities_upkeep}")
                deduct_player_currency(user, sum_of_entities_upkeep)
            
            # SEND SOME NOTIFICATION
