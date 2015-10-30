

            var semana = new Array(6);
            semana[0] = 'Dom';
            semana[1] = 'Seg';
            semana[2] = 'Ter';
            semana[3] = 'Qua';
            semana[4] = 'Qui';
            semana[5] = 'Sex';
            semana[6] = 'Sáb';


            $(function() {
                $('#mes').val(new Date().getMonth());
                $('#calcular').click(calcular);
                $('#mes').change(montaCheckBoxFeriado);
                montaCheckBoxFeriado();
            });


            function montaCheckBoxFeriado() {
                var mes = $('#mes option:selected').val();
                var dia = recuperaUltimoDiaDo(mes);

                var data = new Date();
                data.setMonth(mes);

                var quebra = 0;
                var tabela = $("<table class='table table-striped'></table>");
                var linha = $("<tr></tr>");
                
                
                for (var x = 1; x <= dia; x++) {
                    data.setDate(x);
                    
                    if (quebra == 5) {
                        linha = $("<tr></tr>");
                        quebra = 0;
                    }
                    quebra++;
                    linha.append("<td><input type='checkbox' name='feriado' value='" + x + "'/>" + x + "</td>");
                    tabela.append(linha);
                }
                $('#feriados').html('');
                $('#feriados').append(tabela);
                $('#ponto').html('');
            }


            function Ponto(dia, mes) {


                var horaEntrada       = new Date(1970, 0, 1);
                var horaSaidaAlmoco   = new Date(1970, 0, 1);
                var horaEntradaAlmoco = new Date(1970, 0, 1);
                var horaSaida         = new Date(1970, 0, 1);
                var tempoAlmocoTotal  = new Date(1970, 0, 1);
                var tempoTotal        = new Date(1970, 0, 1);

                function defineTempo() {
                    var horario = $('#horario option:selected').val();
                    if (horario == '0') {
                        horaEntrada.setHours(8);
                        horaEntrada.setMinutes(aleatorio(-15, 15));
                        horaSaidaAlmoco.setHours(12);
                        horaSaidaAlmoco.setMinutes(aleatorio(0, 15));
                        horaEntradaAlmoco.setHours(14);
                        horaEntradaAlmoco.setMinutes(aleatorio(-15, 15));
                        horaSaida.setHours(18);
                        horaSaida.setMinutes(aleatorio(0, 15));
                    } else if (horario == '1') {
                        horaEntrada.setHours(9);
                        horaEntrada.setMinutes(aleatorio(-15, 5));
                        horaSaidaAlmoco.setHours(12);
                        horaSaidaAlmoco.setMinutes(aleatorio(5, 15));
                        horaEntradaAlmoco.setHours(13);
                        horaEntradaAlmoco.setMinutes(aleatorio(0, 15));
                        horaSaida.setHours(18);
                        horaSaida.setMinutes(aleatorio(0, 15));
                    } else if (horario == '2') {
                        horaEntrada.setHours(8);
                        horaEntrada.setMinutes(aleatorio(-15, 15));
                        horaSaidaAlmoco.setHours(12);
                        horaSaidaAlmoco.setMinutes(aleatorio(0, 15));
                        horaEntradaAlmoco.setHours(13);
                        horaEntradaAlmoco.setMinutes(aleatorio(-15, 15));
                        horaSaida.setHours(17);
                        horaSaida.setMinutes(aleatorio(0, 15));
                    }
                    
                }

                function isValido() {

                    if (horaSaida.getMinutes() == horaEntradaAlmoco.getMinutes() || horaSaida.getMinutes() == horaEntrada.getMinutes() || horaSaida.getMinutes() == horaSaidaAlmoco.getMinutes())
                        return false;
                    if (horaEntradaAlmoco.getMinutes() == horaSaida.getMinutes() || horaEntradaAlmoco.getMinutes() == horaEntrada.getMinutes() || horaEntradaAlmoco.getMinutes() == horaSaidaAlmoco.getMinutes())
                        return false;
                    if (horaEntrada.getMinutes() == horaSaida.getMinutes() || horaEntrada.getMinutes() == horaEntradaAlmoco.getMinutes() || horaEntrada.getMinutes() == horaSaidaAlmoco.getMinutes())
                        return false;
                    if (horaSaidaAlmoco.getMinutes() == horaSaida.getMinutes() || horaSaidaAlmoco.getMinutes() == horaEntrada.getMinutes() || horaSaidaAlmoco.getMinutes() == horaEntradaAlmoco.getMinutes())
                        return false;

                    var time = horaSaida.getTime() - horaEntradaAlmoco.getTime() + horaSaidaAlmoco.getTime() - horaEntrada.getTime();
                    var horas = time / 3600000;
                    var minutos = (time % 3600000) / 60000;

                    if (horas != 8)
                        return false;
                    if (minutos > 5)
                        return false;

                    var timeAlmoco = horaEntradaAlmoco.getTime() - horaSaidaAlmoco.getTime();

                    var horasAlmoco = timeAlmoco / 3600000;
                    var minutosAlmoco = (timeAlmoco % 3600000) / 60000;
                    tempoAlmocoTotal.setHours(horasAlmoco);
                    tempoAlmocoTotal.setMinutes(minutosAlmoco);


                    tempoTotal.setHours(horas);
                    tempoTotal.setMinutes(minutos);
                    return true;
                }

                this.toHtml = function() {
                    var data = new Date();
                    data.setMonth(mes);
                    data.setDate(dia);

                    var feriados = [];
                    $("input[type='checkbox']:checked").each(function() {
                        feriados.push($(this).val());
                    });
                    var diasFeriado = "," + feriados.join(',') + ",";

                    if (diasFeriado.search("," + this.dia.toString() + ",") != -1) {
                        var linha = $("<tr></tr>");
                        linha.append("<td class='text-center'>" + semana[data.getDay()] + "</td>");
                        linha.append("<td class='text-center'>" + this.dia + "</td>");
                        linha.append("<td class='text-center'>Feriado</td>");
                        linha.append("<td class='text-center'></td>");
                        linha.append("<td class='text-center'></td>");
                        linha.append("<td class='text-center'></td>");
                        linha.append("<td class='text-center'></td>");
                        return linha
                    }


                    if (data.getDay() == 6 || data.getDay() == 0) {
                        var linha = $("<tr></tr>");
                        linha.append("<td class='text-center'>" + semana[data.getDay()] + "</td>");
                        linha.append("<td class='text-center'>" + this.dia + "</td>");
                        linha.append("<td class='text-center'></td>");
                        linha.append("<td class='text-center'></td>");
                        linha.append("<td class='text-center'></td>");
                        linha.append("<td class='text-center'></td>");
                        linha.append("<td class='text-center'></td>");
                        linha.append("<td class='text-center'></td>");
                        return linha
                    }

                    var linha = $("<tr></tr>");
                    linha.append("<td class='text-center'>" + semana[data.getDay()] + "</td>");
                    linha.append("<td class='text-center'>" + this.dia + "</td>");
                    linha.append("<td class='text-center'>" + this.horaEntrada.format("HH:MM") + "</td>");
                    linha.append("<td class='text-center'>" + this.horaSaidaAlmoco.format("HH:MM") + "</td>");
                    linha.append("<td class='text-center'>" + this.horaEntradaAlmoco.format("HH:MM") + "</td>");
                    linha.append("<td class='text-center'>" + this.horaSaida.format("HH:MM") + "</td>");
                    linha.append("<td class='text-center'>" + this.tempoAlmocoTotal.format("HH:MM") + "</td>");
                    linha.append("<td class='text-center'>" + this.tempoTotal.format("HH:MM") + "</td>");
                    return linha
                }

                defineTempo();
                while (!isValido())
                    defineTempo();


                this.dia = dia;
                this.horaEntrada = horaEntrada;
                this.horaSaidaAlmoco = horaSaidaAlmoco;
                this.horaEntradaAlmoco = horaEntradaAlmoco;
                this.horaSaida = horaSaida;
                this.tempoAlmocoTotal = tempoAlmocoTotal;
                this.tempoTotal = tempoTotal;

                return this;
            }


            function FolhaPonto(mes) {
                var ultimoDiaMes = recuperaUltimoDiaDo(mes);
                var pontos = [];
                for (x = 1; x <= ultimoDiaMes; x++) {
                    var ponto = new Ponto(x, mes);
                    if (pontos.length > 1) {
                        var pontoAnterior = pontos[pontos.length - 1];
                        for (i = 0; i < 600; i++) {
                            if (valida(ponto, pontoAnterior))
                                break;
                            ponto = new Ponto(x, mes);
                        }
                        if (!valida(ponto, pontoAnterior))
                            alert("detectado horario britânico calcule novamente");
                    }
                    pontos.push(ponto);
                }

                function valida(ponto, pontoAnterior) {
                    return ponto.horaEntrada.getMinutes() != pontoAnterior.horaEntrada.getMinutes() && ponto.horaSaidaAlmoco.getMinutes() != pontoAnterior.horaSaidaAlmoco.getMinutes() && ponto.horaEntradaAlmoco.getMinutes() != pontoAnterior.horaEntradaAlmoco.getMinutes() && ponto.horaSaida.getMinutes() != pontoAnterior.horaSaida.getMinutes();
                }

                this.toHtml = function() {
                    var titulo = $("<h1>Folha de ponto</h1>");
                    var table = $("<table class='table table-striped table-hover'></table>");

                    var linha = $("<thead></thead>");
                    linha.append("<td class='text-center'>Semana</td>");
                    linha.append("<td class='text-center'>Dia</td>");
                    linha.append("<td class='text-center'>Entrada</td>");
                    linha.append("<td class='text-center'>Saida</td>");
                    linha.append("<td class='text-center'>Entrada</td>");                    
                    linha.append("<td class='text-center'>Saida</td>");
                    linha.append("<td class='text-center'>Almoço</td>");
                    linha.append("<td class='text-center'>Total</td>");
                    table.append(linha);
                    for (x in this.pontos)
                        table.append(this.pontos[x].toHtml());

                    return table;
                }

                this.pontos = pontos;
                return this;
            }

            function recuperaUltimoDiaDo(mes) {
                var date = new Date();
                date.setMonth(mes);
                var newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                return newDate.getDate();
            }

            function calcular() {
                var mes = $('#mes option:selected').val();
                var folhaPonto = new FolhaPonto(mes);
                $('#ponto').html('');
                $('#ponto').append(folhaPonto.toHtml());
            }


            function aleatorio(inferior, superior) {
                numPosibilidades = superior - inferior
                aleat = Math.random() * numPosibilidades
                aleat = Math.round(aleat)
                return parseInt(inferior) + aleat
            }
        