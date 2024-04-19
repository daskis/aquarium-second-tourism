from django.contrib.auth.views import LoginView
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView

from .forms import *


def base(request):
    return render(request, 'base.html')

class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'loginform.html'
    extra_context = {'title': 'Авторизация'}

    def get_success_url(self):
        return reverse_lazy('dashboard:base')


class RegisterUser(CreateView):
    form_class = RegisterUserForm
    template_name = 'registerform.html'
    extra_context = {'title': "Регистрация"}
    success_url = reverse_lazy('dashboard:login')

# class Facility_list(ListView):
#     model = Facility
#     template_name = 'dashboard/facility-list.html'
#     context_object_name = 'facilities'

class FacilityList(CreateView):
    model = Facility
    form_class = FacilityForm
    template_name = 'dashboard/facility-list.html'
    # success_url = '/success-url/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['facility_list'] = Facility.objects.all()
        context['form'] = FacilityForm()
        return context

    def post(self, request, *args, **kwargs):
        form = FacilityForm(request.POST)
        if form.is_valid():
            form.save()
            return super().get(request, *args, **kwargs)
        return render(request, self.template_name, {'facility_list': Facility.objects.all(), 'form': form})

class ServiceList(CreateView):
    model = Service
    form_class = ServiceForm
    template_name = 'dashboard/service-list.html'
    # success_url = '/success-url/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        service_id = self.kwargs.get('pk')
        context['service_list'] = Service.objects.filter(facility=service_id)
        context['facility'] = Facility.objects.get(pk=service_id)
        context['form'] = ServiceForm()
        return context
