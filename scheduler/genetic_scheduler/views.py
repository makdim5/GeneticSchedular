from rest_framework.response import Response
from rest_framework.views import APIView

from .genetic_logic.main import main


class SchedulerView(APIView):
    def get(self, request):
        return Response(main())
