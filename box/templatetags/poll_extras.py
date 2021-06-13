from django import template

register = template.Library()

@register.filter
def implemented_suggestions(cat):
    """"""
    return cat.suggestions.filter(is_implemented=True).count()

@register.filter
def pending_suggestions(cat):
    """"""
    return cat.suggestions.filter(is_implemented=False).count()
