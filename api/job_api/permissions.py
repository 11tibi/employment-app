from rest_framework import permissions


class IsUnauthenticated(permissions.BasePermission):
    """
    Allows access only to unauthenticated users.
    """
    def has_permission(self, request, view):
        return bool(not request.user.is_authenticated)
