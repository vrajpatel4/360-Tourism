<script type="text/javascript">
  $(function(){


    $("#image_default").change(function(){
      var preview_default = $('.default_preview_img');

   preview_default.fadeOut();

    /* html FileRender Api */
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("image_default").files[0]);

    oFReader.onload = function (oFREvent) {
      preview_default.attr('src', oFREvent.target.result).fadeIn();

    };

  });



   var options = {   beforeSend: function()
    {

    },
    uploadProgress: function(event, position, total, percentComplete)
    {

    },
    success: function()
    {

    },
    complete: function(response)
    {

    if($.trim(response.responseText) == "done"){
       $(".output").html('please Wait...');
      window.location.href = "<?php echo base_url().$this->uri->segment(1)."/extras/"?>";
    }
    },
    target: '.output' };
    $('.supp-form').submit(function() {
        $(this).ajaxSubmit(options);
        $('html, body').animate({
        scrollTop: $('.panel-bg').offset().top
    }, 'slow');
        return false;
    });






  })


    function foreverOpt(option){

           if(option == '1'){

                $('.forever').removeAttr('disabled');

           }else{
         $('.fdate').attr('disabled','disabled');
       $('.forever').attr('disabled','disabled');

           }

  }


  function fdateOpt(option){

           if(option == 'bydate'){

                $('.fdate').removeAttr('disabled');

           }else{

       $('.fdate').attr('disabled','disabled');

           }

  }

   function showModItems(modtype){
  $('#pt_reload_modal').modal('show');

  $.post("<?php echo base_url();?>admin/ajaxcalls/get_module_items", {modtype: modtype, user: '<?php echo @$issupplier;?>', segment: '<?php echo $this->uri->segment(1); ?>' }, function(theResponse){


  	$("#extras_for_id").html(theResponse).select2(    {
        width:'100%',

        });
               $('#pt_reload_modal').modal('hide');
  	});

  }

</script>
<div class="<?php echo body;?>">
  <div class="output"> </div>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <span class="panel-title pull-left"><i class="fa fa-tags"></i> Manage Supplement</span>
      <div class="pull-right">
        <?php echo PT_BACK; ?>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="panel-body">
      <div class="spacer20px">
        <div class="col-lg-3">
          <div class="well">
            <form class="form-horizontal supp-form" method="POST" action="" enctype="multipart/form-data" >
              <div class="form-group">
                <label class="col-md-4 control-label">Status</label>
                <div class="col-md-8">
                  <select class="form-control" name="suppstatus">
                    <option value="1" <?php if($details[0]->extras_status == '1'){echo "selected";}?> > Enabled</option>
                    <option value="0"  <?php if($details[0]->extras_status == '0'){echo "selected";}?>> Disable </option>
                  </select>
                </div>
              </div>
              <div class="form-group forever">
                <label class="col-md-4 control-label">&nbsp;</label>
                <div class="col-md-8">
                  <select  Placeholder="No" class="form-control" name="foreverfeatured" onchange="fdateOpt(this.options[this.selectedIndex].value)" >
                    <option  value="forever" <?php if($details[0]->extras_forever == 'forever'){echo "selected";}?> >Forever</option>
                    <option  value="bydate" <?php if($details[0]->extras_forever != 'forever'){echo "selected";}?> >By Date</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label">From</label>
                <div class="col-xs-12 col-sm-12 col-md-2 col-lg-8">
                  <input class="form-control input-sm dpd1 fdate" type="text" class="form-control" placeholder="From" value="<?php if($details[0]->extras_forever != 'forever'){ echo pt_show_date_php($details[0]->extras_from);}?>" name="ffrom" <?php if($details[0]->extras_forever == 'forever'){echo "disabled";}?>>
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label">To</label>
                <div class="col-xs-12 col-sm-12 col-md-2 col-lg-8">
                  <input class="form-control input-sm dpd2 fdate" type="text" class="form-control" placeholder="To" value="<?php if($details[0]->extras_forever != 'forever'){ echo pt_show_date_php($details[0]->extras_to);}?>" name="fto" <?php if($details[0]->extras_forever == 'forever'){echo "disabled";}?>>
                </div>
              </div>
              <?php
                if(!empty($modules)){

                ?>
              <div class="form-group">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-12">
                  <select data-placeholder="Select Module" class="chosen-select" name="suppfor" onchange="showModItems(this.options[this.selectedIndex].value)"  >
                    <option value="">Select Module</option>
                    <?php
                      foreach($modules as $mod):
                         $istrue = $this->ptmodules->is_mod_available_enabled($mod);
                          $isintegration = $this->ptmodules->is_integration($mod);
                        if($istrue && !$isintegration && !in_array($mod,$this->ptmodules->notinclude)){
                      ?>
                    <option value="<?php echo $mod;?>" <?php if($mod == $details[0]->extras_module){ echo "selected";}?>  ><?php echo ucfirst($mod);?></option>
                    <?php } endforeach; ?>
                  </select>
                </div>
              </div>
              <?php
                }
                $itemids = explode(",",$details[0]->extras_for);


                ?>
              <div class="form-group">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-12">
                  <select data-placeholder="Supplement For"  multiple class="chosen-multi-select"  id="extras_for_id" name="extras_for_id[]">
                    <?php
                      foreach($moduleitems as $ids){


                      ?>
                    <option value="<?php echo $ids->id;?>" <?php if(in_array($ids->id,$itemids)){echo "selected";}?> ><?php echo $ids->title;?></option>
                    <?php
                      }

                      ?>
                  </select>
                </div>
              </div>
              <hr>
              <div class="form-group">
                <label class="col-md-10 control-label"> STARDARD PRICE</label>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label"> Basic</label>
                <div class="col-md-6">
                  <input class="form-control" Placeholder="Price" type="text" name="basicprice" value="<?php echo $details[0]->extras_basic_price;?>" />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label"> Discount</label>
                <div class="col-md-6">
                  <input class="form-control" Placeholder="Price" type="text" name="discountprice" value="<?php if($details[0]->extras_discount > 0){echo $details[0]->extras_discount;}?>" />
                </div>
              </div>
          </div>
        </div>
        <div class="col-lg-9">
        <div class="col-lg-4">
        <div class="thumbnail">
        <?php
          if(empty($details[0]->extras_image)){
          ?>
        <img class="img-responsive default_preview_img" src="<?php echo PT_DEFAULT_IMAGE.'supplement.png'; ?>">
        <?php
          }else{

          ?>
        <img class="img-responsive default_preview_img" src="<?php echo PT_EXTRAS_IMAGES.$details[0]->extras_image; ?>">
        <?php
          }

          ?>
        </div>
        </div>
        <div class="col-lg-8">
        <div class="well">
        <div class="form-group">
        <label class="col-md-4 control-label">Default Image</label>
        <div class="col-md-1">
        <input type="file" name="defaultphoto" id="image_default" />
        </div>
        </div>
        </div>
        </div>
        <div class="col-lg-8">
        <div class="well">
        <div class="form-group">
        <input class="form-control input-lg" type="text" placeholder="Type name here" name="suppname" value="<?php echo $details[0]->extras_title;?>">
        </div>
        </div>
        </div>
        <div class="col-lg-12">
        <div class="well">
        <label class="col-md-12 control-label">Description</label>
        <textarea class="form-control" placeholder="Full description here..." rows="8" name="suppdesc"><?php echo $details[0]->extras_desc;?></textarea>
        </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  <input type="hidden" name="defimg" value="<?php echo $details[0]->extras_image;?>" />
  <input type="hidden" name="updatesupp" value="1" />
  <button type="submit" class="btn btn-primary btn-lg pull-right"><i class="fa fa-save"></i> Submit</button>
  </form>
</div>