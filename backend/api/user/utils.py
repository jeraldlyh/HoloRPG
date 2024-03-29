from django.utils import timezone


def get_duration(then, now = timezone.now(), interval="Default"):
    """
        Returns the various time formats based on a specified time
    """
    duration = now - then
    duration_in_s = duration.total_seconds()
    
    def years():
        return divmod(duration_in_s, 31536000) # Seconds in a year = 31536000

    def days(seconds = None):
        return divmod(seconds if seconds != None else duration_in_s, 86400) # Seconds in a day = 86400

    def hours(seconds = None):
        return divmod(seconds if seconds != None else duration_in_s, 3600) # Seconds in an hour = 3600

    def minutes(seconds = None):
        return divmod(seconds if seconds != None else duration_in_s, 60) # Seconds in a minute = 60

    def seconds(seconds = None):
        if seconds != None:
            return divmod(seconds, 1)
        return duration_in_s
    
    def totalDuration():
        y = years()
        d = days(y[1])
        h = hours(d[1])
        m = minutes(h[1])
        s = seconds(m[1])

        return "Time between dates: {} years, {} days, {} hours, {} minutes and {} seconds".format(int(y[0]), int(d[0]), int(h[0]), int(m[0]), int(s[0]))

    return {
        'years': int(years()[0]),
        'days': int(days()[0]),
        'hours': int(hours()[0]),
        'minutes': int(minutes()[0]),
        'seconds': int(seconds()),
        'default': totalDuration()
    }[interval]


def clamp(number, lower, upper):
    """
        Limits the range of a number with a specified boundary
    """
    return max(min(number, upper), lower)